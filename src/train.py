import os
import numpy as np
import tensorflow as tf
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report

seed = 18

tf.random.set_seed(seed)
np.random.seed(seed)

print(tf.config.list_physical_devices("GPU"))

dataset_dir = r'ODIR'
result_dir = r'results'

BATCH_SIZE = 8
IMG_SIZE = (224, 224)
dataset_name = "ODIR"


def create_train_test_datasets(data_dir, batch_size=BATCH_SIZE):
    train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rescale=1. / 255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        vertical_flip=True,
        horizontal_flip=True
    )

    test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1. / 255)

    train_data = train_datagen.flow_from_directory(
        os.path.join(data_dir, 'train'),
        target_size=IMG_SIZE,
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=True,
        seed=seed
    )

    test_data = test_datagen.flow_from_directory(
        os.path.join(data_dir, 'test'),
        target_size=IMG_SIZE,
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=False
    )

    return train_data, test_data


def load_base_model(class_num, input_shape, model_name):
    if model_name == "MobileNetV2":
        base_model = tf.keras.applications.mobilenet_v2.MobileNetV2(include_top=False, input_shape=input_shape,
                                                                    classes=class_num)
    if model_name == "DenseNet121":
        base_model = tf.keras.applications.densenet.DenseNet121(include_top=False, input_shape=input_shape,
                                                                classes=class_num)
    if model_name == "InceptionV3":
        base_model = tf.keras.applications.inception_v3.InceptionV3(include_top=False, input_shape=input_shape,
                                                                    classes=class_num)
    if model_name == "Xception":
        base_model = tf.keras.applications.xception.Xception(include_top=False,
                                                             input_shape=input_shape, classes=class_num)

    for layer in base_model.layers:
        layer.trainable = True

    return base_model


def create_model(class_num, input_shape, model_name):
    inputs = tf.keras.Input(shape=input_shape)
    base_model = load_base_model(class_num, input_shape, model_name)
    X = base_model(inputs, training=False)
    X = tf.keras.layers.GlobalAveragePooling2D()(X)
    X = tf.keras.layers.Dropout(0.5)(X)
    output = tf.keras.layers.Dense(class_num, activation='softmax')(X)
    model = tf.keras.models.Model(inputs=inputs, outputs=output)
    model.summary()
    return model


def compile_model(model):
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.0001)
    model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
    return model


def callbacks():
    early_stop = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, verbose=1,
                                                  mode='auto', restore_best_weights=True)

    reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=5,
                                                     verbose=1, mode='auto')
    return early_stop, reduce_lr


if __name__ == '__main__':

    model_names = ["MobileNetV2", "DenseNet121", "InceptionV3","Xception"]

    acc_loss = {}

    for model_name in model_names:

        res_dir = os.path.join(result_dir, dataset_name + "-LastTrain-" + model_name)
        if not os.path.exists(res_dir):
            os.makedirs(res_dir)

        print(f"{model_name} için eğitime başlandı.")

        train_data, test_data = create_train_test_datasets(dataset_dir)
        print("Train ve test verisi oluşturuldu.")

        model = create_model(class_num=8, input_shape=(224, 224, 3), model_name=model_name)
        print("Model oluşturuldu.")
        model = compile_model(model)
        print("Model derlendi.")

        n_epoch = 100
        early_stop, reduce_lr = callbacks()
        print("EarlyStopping ve ReduceLROnPlateau callbacks tanımlandı.")
        print("Epoch sayısı:", n_epoch)
        print("Model eğitiliyor...")
        model.fit(train_data, validation_data=test_data, epochs=n_epoch, shuffle=True, verbose=1,
                  callbacks=[reduce_lr, early_stop])
        print("Model eğitimi tamamlandı.")

        tf.saved_model.save(model, res_dir + "\\" + dataset_name + model_name + '_adam_1e4')
        print("Model kaydedildi.")

        results = model.evaluate(test_data)
        acc_loss[model] = results
        print("Test Loss, Test Accuracy:", results)

        print("Confusion Matrix")
        predictions = model.predict(
            test_data,
            steps=np.math.ceil(test_data.samples / test_data.batch_size),
        )
        predicted_classes = np.argmax(predictions, axis=1)
        true_classes = test_data.classes
        class_labels = list(test_data.class_indices.keys())
        cm = confusion_matrix(y_pred=predicted_classes, y_true=true_classes)
        plt.figure()
        sns.heatmap(cm, xticklabels=class_labels, yticklabels=class_labels, annot=True, fmt='d', cmap='crest')
        plt.savefig(res_dir + "\\" + dataset_name + model_name + '_confusion_matrix.png')
        plt.close()

        report_str = classification_report(true_classes, predicted_classes, target_names=class_labels)
        print(report_str)

        lines = report_str.split('\n')
        data = {}
        for line in lines[2:-5]:
            row_data = line.split()
            if row_data:
                class_name = ' '.join(row_data[:-4])
                precision, recall, f1_score, _ = map(float, row_data[-4:])
                data[class_name] = {'Precision': precision, 'Recall': recall, 'F1-Score': f1_score}

        df_report = pd.DataFrame.from_dict(data, orient='index')

        shortened_labels = ["AMD", "CAT", 'DR', 'GLC', 'HTN', 'NORMAL', 'OTHERS', 'PM']
        df_report.to_excel(res_dir + '\\' + dataset_name + model_name + '_adam_1e4_classification_report.xlsx')
        plt.figure()
        df_report.plot(kind='bar', rot=0)
        plt.title('Classification Report')
        plt.xlabel('Classes')
        plt.ylabel('Scores')
        plt.legend(title='Metrics')
        plt.xticks(range(len(shortened_labels)), shortened_labels, rotation=45)
        plt.tight_layout()
        plt.savefig(res_dir + dataset_name + model_name + '_classification_report.png')
        plt.close()

    df_acc = pd.DataFrame(acc_loss)
    df_acc.to_excel(result_dir + '\\' + dataset_name + '_adam_1e4_acc_loss.xlsx', index=False)
import cv2
import tensorflow as tf
import numpy as np
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import uvicorn

app = FastAPI()


def crop_image_from_gray(img, tol=7):
    if img.ndim == 2:
        mask = img > tol
        return img[np.ix_(mask.any(1), mask.any(0))]
    elif img.ndim == 3:
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        mask = gray_img > tol
        check_shape = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))].shape[0]
        if check_shape == 0:
            return img
        else:
            img1 = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))]
            img2 = img[:, :, 1][np.ix_(mask.any(1), mask.any(0))]
            img3 = img[:, :, 2][np.ix_(mask.any(1), mask.any(0))]
            img = np.stack([img1, img2, img3], axis=-1)
        return img


def load_ben_color(image, sigmaX=10):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = crop_image_from_gray(image)
    image = cv2.resize(image, (224, 224))
    image = cv2.addWeighted(image, 4, cv2.GaussianBlur(image, (0, 0), sigmaX), -4, 128)
    return image


def clahe(image):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    r, g, b = cv2.split(image)
    r = clahe.apply(r)
    g = clahe.apply(g)
    b = clahe.apply(b)
    result = cv2.merge((r, g, b))
    return result


def filter1(image):
    image = load_ben_color(image)
    return image


def filter2(image):
    image = clahe(image)
    image = cv2.resize(image, (224, 224))
    return image


def predict(image, model, filter):
    model_image = filter(image)
    model_image = np.array([model_image], dtype=np.float32) / 255.0
    infer = model.signatures["serving_default"]
    predictions = infer(tf.constant(model_image))[next(iter(infer.structured_outputs.keys()))].numpy()
    return predictions


def result(predictions):
    predictions = np.array(predictions)
    predictions = predictions.tolist()[0]
    predictions_index = np.argmax(predictions)

    if len(predictions) == 5:
        class_labels = ["Cataract", "Diabetes", "Glaucoma", "Normal", "Pathological Myopia"]
    elif len(predictions) == 6:
        class_labels = ["Age related Macular Degeneration", "Cataract", "Diabetes", "Glaucoma", "Normal", "Pathological Myopia"]
    else:
        class_labels = ["Age related Macular Degeneration", "Cataract", "Diabetes", "Glaucoma", "Hypertension", "Normal", "Others", "Pathological Myopia"]

    result_json = {
        "class": class_labels[predictions_index],
        "probability": predictions[predictions_index]
    }

    return result_json

models_names = [
    "Xception",
    "5 Sınıflı Xception",
    "6 Sınıflı Xception"
]

models_paths = [
    "ODIR-B-2K-LastTrain-Xception",
    "ODIR-B-2K-5Class-LastTrain-Xception",
    "ODIR-B-2K-6Class-LastTrain-Xception"
]

filters = [filter1, filter1, filter1]

models = []

for model_path in models_paths:
    model = tf.saved_model.load(model_path)
    models.append(model)


@app.post("/predict")
async def predict_endpoint(file: UploadFile = File(...)):

    contents = await file.read()
    nparr = np.fromstring(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    result_json = {}

    for i in range(len(models)):
        model = models[i]
        prediction = predict(image, model, filters[i])
        result_json[models_names[i]] = result(prediction)

    return result_json
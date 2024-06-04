import os
import cv2
import numpy as np
import albumentations as A
import shutil
from tqdm import tqdm
import math

aug = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.VerticalFlip(p=0.5),
    A.Rotate(p=0.5, interpolation=cv2.INTER_LINEAR, border_mode=cv2.BORDER_CONSTANT, value=0, mask_value=0),
])

path = "ODIR"
desired_samples_per_class = 10000

fold = "fold1"
for subfold in os.listdir(os.path.join(path, fold)):
    if subfold == "train":
        class_names = os.listdir(os.path.join(path, fold, subfold))
        original_data_path = os.path.join(path, fold, subfold)

        # Her sınıf için işlem yap
        for class_name in class_names:
            print(class_name, "Başladı")
            class_folder_original = os.path.join(original_data_path, class_name)
            if os.path.isdir(class_folder_original):
                try:
                    # Sınıf klasöründeki dosyaları al
                    files = os.listdir(class_folder_original)
                    for file_name in files:
                        for i in range(math.ceil(desired_samples_per_class / len(files)) - 1):
                            # Görüntüleri oku ve boyutlandır
                            img_path = os.path.join(class_folder_original, file_name)
                            img = cv2.imread(img_path)
                            img = cv2.resize(img, (512, 512))

                            # Augmentation uygula
                            augmented = aug(image=img)
                            augmented_img = augmented["image"]

                            # Augmented görüntüyü kaydet
                            img_name = f"{file_name.split('.')[0]}_augmented_{i}.jpg"
                            img_path = os.path.join(class_folder_original, img_name)
                            cv2.imwrite(img_path, augmented_img)
                            if len(os.listdir(class_folder_original)) >= desired_samples_per_class:
                                break
                        if len(os.listdir(class_folder_original)) >= desired_samples_per_class:
                            break
                except Exception as e:
                    continue

        # Augmentation sonrası veri sayısını yazdır
        print("Augmentation sonrası görüntü sayısı:", len(os.listdir(class_folder_original)))
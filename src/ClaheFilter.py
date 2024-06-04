import cv2
import os
from tqdm import tqdm

path = r"datasets\preprocessed_images"
save_path = r"datasets\ODIR-CLAHE"

def clahe_filter(image):
    # Get color channels separately
    b, g, r = cv2.split(image)

    # Create CLAHE object
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))

    # Render color channels with CLAHE
    enhanced_b = clahe.apply(b)
    enhanced_g = clahe.apply(g)
    enhanced_r = clahe.apply(r)

    # Merge color channels
    enhanced_image = cv2.merge([enhanced_b, enhanced_g, enhanced_r])
    return enhanced_image

if __name__ == "__main__":
    for img in tqdm(os.listdir(path)):
        input_image = cv2.imread(os.path.join(path,img))
        enhanced_image = clahe_filter(input_image)
        resized_image = cv2.resize(enhanced_image, (224,224))
        cv2.imwrite(os.path.join(save_path,img), resized_image)

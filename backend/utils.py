# backend/utils.py

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import json
import os

def load_model():
    # Define relative paths
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, "model/model.pth")
    class_path = os.path.join(base_dir, "model/class_names.json")

    # Load class labels
    with open(class_path) as f:
        class_names = json.load(f)

    # Transforms
    global leaf_transform
    leaf_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor()
    ])


    # Load model
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(class_names))
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()

    return model, class_names

def predict_disease(model, class_names, image: Image.Image):
    print("[DEBUG] Image received for prediction.")
    input_tensor = leaf_transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        print("[DEBUG] Model output:", output)
        _, predicted = torch.max(output, 1)
        return class_names[predicted.item()]
    
def load_leaf_classifier():
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, "model/leaf_binary_classifier.pth")

    model = models.mobilenet_v2(pretrained=True)  # ✅ Match training
    model.classifier[1] = nn.Linear(model.last_channel, 2)
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()

    return model



def get_treatment(disease):
    treatment_path = os.path.join(os.path.dirname(__file__), "../disease_treatments.json")
    with open(treatment_path) as f:
        treatment_dict = json.load(f)
    return treatment_dict.get(disease, "No treatment recommendation available.")

def is_leaf_image(model, image: Image.Image, threshold: float = 0.6) -> bool:
    input_tensor = leaf_transform(image).unsqueeze(0)  # use correct transform

    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.softmax(output, dim=1)
        print("[DEBUG] Probabilities:", probabilities)
        leaf_confidence = probabilities[0][0].item()

        print(f"[DEBUG] Leaf confidence: {leaf_confidence:.4f}")
        return leaf_confidence > threshold



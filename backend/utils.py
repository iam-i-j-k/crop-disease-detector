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
    model_path = os.path.join(base_dir, "../model/model.pth")
    class_path = os.path.join(base_dir, "../model/class_names.json")

    # Load class labels
    with open(class_path) as f:
        class_names = json.load(f)

    # Transforms
    global transform
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    # Load model
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(class_names))
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    model.eval()

    return model, class_names

def predict_disease(model, class_names, image: Image.Image):
    print("[DEBUG] Image received for prediction.")
    input_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        print("[DEBUG] Model output:", output)
        _, predicted = torch.max(output, 1)
        return class_names[predicted.item()]

def get_treatment(disease):
    treatment_path = os.path.join(os.path.dirname(__file__), "../disease_treatments.json")
    with open(treatment_path) as f:
        treatment_dict = json.load(f)
    return treatment_dict.get(disease, "No treatment recommendation available.")

import torch
from torchvision import models, transforms
from PIL import Image
import json
import os
import torch.nn as nn


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_disease_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Dynamically load class names from dataset structure
    dataset_dir = "dataset/train"  # Adjust this path as needed
    class_names = sorted(entry.name for entry in os.scandir(dataset_dir) if entry.is_dir())

    # Load MobileNetV2 and adjust classifier for the number of classes
    model = models.mobilenet_v2(pretrained=False)
    model.classifier[1] = nn.Linear(model.last_channel, len(class_names))

    # Load saved model weights
    model_path = "model/disease_model.pth"
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    return model, class_names

# Load binary leaf classifier model
def load_leaf_classifier():
    model = models.mobilenet_v2(pretrained=False)
    model.classifier[1] = torch.nn.Linear(model.last_channel, 2)
    model.load_state_dict(torch.load("backend/model/leaf_binary_classifier.pth", map_location=device))
    model.eval()
    return model

# Check if uploaded image is a leaf
def is_leaf_image(leaf_model, image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        pred = leaf_model(tensor)
        _, pred_class = torch.max(pred, 1)
        return pred_class.item() == 0  # 0 = leaf

# Predict crop disease
def predict_disease(disease_model, class_names, image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = disease_model(tensor)
        _, predicted = torch.max(outputs, 1)
    return class_names[predicted.item()]

# Treatment lookup
def get_treatment(disease_name: str):
    treatments = {
        "Apple___Black_rot": "Remove infected fruit and apply fungicide.",
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Rotate crops and use resistant varieties.",
        # Add more mappings...
    }
    return treatments.get(disease_name, "No treatment available.")

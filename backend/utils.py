import torch
from torchvision import models, transforms
from PIL import Image
import json
import os

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load disease detection model
def load_disease_model():
    model_path = "backend/model/model.pth"
    with open("backend/model/class_names.json", "r") as f:
        class_names = json.load(f)

    model = models.mobilenet_v2(pretrained=False)
    model.classifier[1] = torch.nn.Linear(model.last_channel, len(class_names))
    model.load_state_dict(torch.load(model_path, map_location=device))
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

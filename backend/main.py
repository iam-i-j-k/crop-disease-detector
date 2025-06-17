# backend/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from backend.utils import load_model, predict_disease, get_treatment
from PIL import Image
import io

app = FastAPI()

# Allow frontend requests (Day 3)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://crop-disease-detector-zeta.vercel.app"]

)

# Load model and class labels once
model, class_names = load_model()

@app.get("/")
def root():
    return {"message": "Crop Disease Detection API running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    disease = predict_disease(model, class_names, image)
    treatment = get_treatment(disease)

    return {
        "disease": disease,
        "treatment": treatment
    }

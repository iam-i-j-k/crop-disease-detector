const API_BASE_URL = 'http://127.0.0.1:8000';

export interface PredictionResponse {
  prediction: string;
  treatment: string;
}

export const predictDisease = async (imageFile: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  console.log('Sending prediction request to:', `${API_BASE_URL}/predict`);
  console.log('File details:', { name: imageFile.name, size: imageFile.size, type: imageFile.type });

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  console.log('API Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error response:', errorText);
    throw new Error(`Failed to predict disease: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Raw API result:', result);
  
  // Map the backend response format to frontend format
  const mappedResult: PredictionResponse = {
    prediction: result.disease || result.prediction || 'Unknown disease',
    treatment: result.treatment || 'No treatment available'
  };
  
  console.log('Mapped result:', mappedResult);
  
  return mappedResult;
};
export const predictDisease = async (imageFile: File): Promise<PredictionResponse | { detail: string }> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  console.log('Sending prediction request to:', `${API_BASE_URL}/predict`);
  console.log('File details:', { name: imageFile.name, size: imageFile.size, type: imageFile.type });

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  console.log('API Response status:', response.status);

  // Always parse response as JSON (even for errors)
  const result = await response.json();
  console.log('Raw API result:', result);

  // Handle non-leaf rejection from backend
  if (!response.ok) {
    return result; // May contain: { detail: "Uploaded image is not a leaf." }
  }

  // Return disease prediction
  const mappedResult: PredictionResponse = {
    prediction: result.disease || result.prediction || 'Unknown disease',
    treatment: result.treatment || 'No treatment available',
  };

  console.log('Mapped result:', mappedResult);
  return mappedResult;
};

from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS
import json
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Load the trained models, scalers, and feature lists
ml_model = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/models/exoplanet_model_ML_dataset.pkl')
ml_scaler = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/models/scaler_ML_dataset.pkl')
ml_imputer = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/models/imputer.pkl')
with open('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/models/selected_features_ML_dataset.json', 'r') as f:
    ml_features = json.load(f)

@app.route('/predict_ml', methods=['POST'])
def predict_ml():
    data = request.get_json()
    features_data = data.get('features')

    if not features_data:
        return jsonify({'error': 'Missing features data'}), 400
    
    try:
        # Create a DataFrame from the input data with the correct feature order
        input_df = pd.DataFrame([features_data], columns=ml_features)
    except Exception as e:
        return jsonify({'error': f'Invalid input data: {e}'}), 400

    # Impute and scale the input data
    input_imputed = ml_imputer.transform(input_df)
    input_scaled = ml_scaler.transform(input_imputed)

    # Predict
    probability = ml_model.predict_proba(input_scaled)
    prediction = ml_model.predict(input_scaled)

    return jsonify({
        'prediction': 'Exoplanet' if prediction[0] == 1 else 'False Positive',
        'probability': float(probability[0][1]) # Probability of being an exoplanet
    })

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Exoplanet Detection API"

if __name__ == '__main__':
    app.run(debug=True)

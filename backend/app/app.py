from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS
import json
import os
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Construct absolute paths to model files based on the location of this script
base_dir = os.path.dirname(os.path.abspath(__file__))
models_dir = os.path.join(base_dir, '..', 'models')

# Load the trained models, scalers, and feature lists
ml_model = load(os.path.join(models_dir, 'exoplanet_model_ML_dataset.pkl'))
ml_scaler = load(os.path.join(models_dir, 'scaler_ML_dataset.pkl'))
ml_imputer = load(os.path.join(models_dir, 'imputer.pkl'))
with open(os.path.join(models_dir, 'selected_features_ML_dataset.json'), 'r') as f:
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

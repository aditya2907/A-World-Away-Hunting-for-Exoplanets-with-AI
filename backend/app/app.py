from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/exoplanet_model.joblib')

def preprocess_and_feature_engineer(lc_data):
    # This function should mirror the preprocessing from your notebook
    # For now, it's a placeholder.
    # In a real application, you would reuse the exact same preprocessing steps.
    
    # Assuming lc_data is a dictionary with 'time' and 'flux'
    # This is a simplified version of your notebook's feature engineering
    
    flux = np.array(lc_data['flux'])
    
    # Simple normalization
    normalized_flux = flux / np.median(flux)
    
    # Basic trend removal (simplified)
    flattened_flux = normalized_flux - np.mean(normalized_flux) + 1

    features = {
        'std_dev_flux': np.std(flattened_flux),
        'median_flux': np.median(flattened_flux),
        'min_flux': np.min(flattened_flux),
        'max_flux': np.max(flattened_flux),
        'percentile_10': np.percentile(flattened_flux, 10),
        'percentile_90': np.percentile(flattened_flux, 90),
        'skewness_flux': pd.Series(flattened_flux).skew(),
        'kurtosis_flux': pd.Series(flattened_flux).kurtosis()
    }
    
    # Add folded features (placeholder)
    for i in range(100):
        features[f'folded_bin_{i}'] = 0
        
    return pd.DataFrame([features])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # The incoming data should be a light curve, e.g., {'time': [...], 'flux': [...]}
    # We need to preprocess it to match the model's input format
    features_df = preprocess_and_feature_engineer(data)
    
    # Predict
    prediction = model.predict(features_df)
    probability = model.predict_proba(features_df)[:, 1]
    
    return jsonify({
        'prediction': int(prediction[0]),
        'probability': float(probability[0])
    })

if __name__ == '__main__':
    app.run(debug=True)

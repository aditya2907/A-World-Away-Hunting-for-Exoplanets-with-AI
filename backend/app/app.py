from flask import Flask, request, jsonify # type: ignore
from joblib import load # type: ignore
import pandas as pd # type: ignore
import numpy as np # type: ignore
from flask_cors import CORS # type: ignore
import json

from tensorflow.keras.models import load_model # type: ignore
import lightkurve as lk # type: ignore
import warnings
warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Load the trained models, scalers, and feature lists
dl_model = load_model('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/backend/exoplanet_model_DL.h5')
ml_model = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/notebooks/models/exoplanet_model_ML_dataset.pkl')
ml_scaler = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/notebooks/models/scaler_ML_dataset.pkl')
ml_imputer = load('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/notebooks/models/imputer.pkl')
with open('/Users/aditya/Desktop/Hackathon/A-World-Away-Hunting-for-Exoplanets-with-AI/notebooks/models/selected_features_ML_dataset.json', 'r') as f:
    ml_features = json.load(f)

# Simple in-memory cache for light curve data
light_curve_cache = {}

BINS = 256

def process_light_curve(kepid, period):
    """
    Downloads, cleans, folds, and bins a Kepler light curve for a given ID and period.
    Uses a cache to avoid re-downloading data.
    """
    if kepid in light_curve_cache:
        # Use cached light curve object
        lc = light_curve_cache[kepid]
    else:
        # Download and cache the light curve
        try:
            search_result = lk.search_lightcurve(f'KIC {kepid}', mission='Kepler')
            lc_collection = search_result.download_all()
            lc = lc_collection.stitch().remove_nans()
            light_curve_cache[kepid] = lc
        except Exception as e:
            print(f"Error downloading or caching light curve for {kepid}: {e}")
            return None

    try:
        flat_lc = lc.flatten(window_length=401)
        folded_lc = flat_lc.fold(period=period)
        binned_lc = folded_lc.bin(time_bin_size=period/BINS, n_bins=BINS)
        normalized_flux = binned_lc.flux.value - np.median(binned_lc.flux.value)
        if not np.all(np.isfinite(normalized_flux)):
             return None
        return normalized_flux
    except Exception as e:
        print(f"Error processing light curve for {kepid}: {e}")
        return None

@app.route('/predict_dl', methods=['POST'])
def predict_dl():
    data = request.get_json()
    kepid = data.get('kepid')
    period = data.get('koi_period')

    if not kepid or not period:
        return jsonify({'error': 'kepid and koi_period are required'}), 400

    flux_data = process_light_curve(kepid, period)

    if flux_data is None:
        return jsonify({'error': 'Could not process light curve for the given kepid and period'}), 500

    # Reshape for the model
    flux_data = np.array(flux_data).reshape(1, BINS, 1)

    # Predict
    probability = dl_model.predict(flux_data)
    prediction = (probability > 0.5).astype(int)

    return jsonify({
        'prediction': 'Exoplanet' if prediction[0][0] == 1 else 'False Positive',
        'probability': float(probability[0][0])
    })

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

from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS
import json
import os
import warnings
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# --- Database and Auth Configuration ---
base_dir = os.path.dirname(os.path.abspath(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'a-super-secret-key-change-this' # Change this in production!

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Model Files Configuration ---
models_dir = os.path.join(base_dir, '..', 'models')

# Load the trained models, scalers, and feature lists
ml_model = load(os.path.join(models_dir, 'exoplanet_model_ML_dataset.pkl'))
ml_scaler = load(os.path.join(models_dir, 'scaler_ML_dataset.pkl'))
ml_imputer = load(os.path.join(models_dir, 'imputer.pkl'))
with open(os.path.join(models_dir, 'selected_features_ML_dataset.json'), 'r') as f:
    ml_features = json.load(f)

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Integer, default=0, nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    star_identifier = db.Column(db.String(200), nullable=False) # A unique ID for the star/data
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    is_planet_vote = db.Column(db.Boolean, nullable=False) # True for 'confirm', False for 'reject'

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
    return "Exoplanet Prediction API is running."

# --- New Authentication Routes ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 409
    
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    
    return jsonify({"msg": "Bad username or password"}), 401

# --- New Gamification Routes ---
@app.route('/vote', methods=['POST'])
@jwt_required()
def vote():
    current_user_username = get_jwt_identity()
    user = User.query.filter_by(username=current_user_username).first()
    
    data = request.get_json()
    star_identifier = data.get('star_identifier')
    is_planet_vote = data.get('is_planet_vote')

    # Check if user already voted on this star
    existing_vote = Vote.query.filter_by(user_id=user.id, star_identifier=star_identifier).first()
    if existing_vote:
        return jsonify({"msg": "You have already voted on this candidate"}), 409

    # Add the vote
    new_vote = Vote(user_id=user.id, star_identifier=star_identifier, is_planet_vote=is_planet_vote)
    db.session.add(new_vote)
    
    # Update user score
    user.score += 1
    db.session.commit()

    return jsonify({"msg": "Vote recorded!", "new_score": user.score}), 200

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    top_users = User.query.order_by(User.score.desc()).limit(10).all()
    leaderboard_data = [{"username": user.username, "score": user.score} for user in top_users]
    return jsonify(leaderboard_data)

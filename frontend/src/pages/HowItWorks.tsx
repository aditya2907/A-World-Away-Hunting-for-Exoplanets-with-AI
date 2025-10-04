import Navbar from "@/components/Navbar";

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      <div className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">How It Works</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our exoplanet detection system uses a sophisticated machine learning model to analyze stellar data and predict the likelihood of a celestial object being an exoplanet.
          </p>
        </div>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-2">The Machine Learning Model</h2>
            <p>
              The core of our prediction engine is a <strong>Gradient Boosting Classifier</strong>, a powerful ensemble learning method. This model was trained on a vast dataset of confirmed exoplanets and false positives from the Kepler Space Telescope mission.
            </p>
            <p className="mt-2">
              The model analyzes a set of key features for each candidate object. These features include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Orbital Period (koi_period):</strong> The time it takes for the planet to complete one orbit around its star.</li>
              <li><strong>Transit Duration (koi_duration):</strong> The length of time the star's light dims during a transit.</li>
              <li><strong>Transit Depth (koi_depth):</strong> The amount of light blocked by the planet, which relates to its size.</li>
              <li><strong>Signal-to-Noise Ratio (koi_model_snr):</strong> A measure of the transit signal's strength relative to background noise.</li>
              <li><strong>Stellar Properties (koi_steff, koi_slogg, koi_srad):</strong> Characteristics of the host star, such as its temperature, gravity, and radius.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">The Prediction Process</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Input Features:</strong> The user provides input values for the key features. This can be done through the "Simple Input" sliders for the most impactful features or the "Advanced Input" form for a full set of parameters.
              </li>
              <li>
                <strong>Data Preprocessing:</strong> Before being fed to the model, the input data is preprocessed. This involves:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Imputation:</strong> Missing values are filled in using the mean value from the training dataset.</li>
                  <li><strong>Scaling:</strong> The features are scaled to a standard range, ensuring that no single feature disproportionately influences the model's prediction.</li>
                </ul>
              </li>
              <li>
                <strong>Prediction:</strong> The preprocessed data is passed to the trained Gradient Boosting model, which calculates the probability of the candidate being an exoplanet.
              </li>
              <li>
                <strong>Output:</strong> The system returns a prediction ("Exoplanet" or "False Positive") and a confidence score, which is the model's calculated probability.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
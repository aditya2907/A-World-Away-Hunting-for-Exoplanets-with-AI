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
            <ul className="list-disc list-inside mt-2 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <li><strong>koi_period:</strong> Orbital period in days.</li>
              <li><strong>koi_time0bk:</strong> Timing of the first transit.</li>
              <li><strong>koi_impact:</strong> Impact parameter of the transit.</li>
              <li><strong>koi_duration:</strong> Duration of the transit in hours.</li>
              <li><strong>koi_depth:</strong> Depth of the transit in ppm.</li>
              <li><strong>koi_prad:</strong> Planet radius in Earth radii.</li>
              <li><strong>koi_teq:</strong> Planet's equilibrium temperature.</li>
              <li><strong>koi_insol:</strong> Insolation flux (Earth flux units).</li>
              <li><strong>koi_model_snr:</strong> Transit signal-to-noise ratio.</li>
              <li><strong>koi_steff:</strong> Stellar effective temperature.</li>
              <li><strong>koi_slogg:</strong> Stellar surface gravity.</li>
              <li><strong>koi_srad:</strong> Stellar radius in Solar radii.</li>
              <li><strong>ra:</strong> Right Ascension of the star.</li>
              <li><strong>dec:</strong> Declination of the star.</li>
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
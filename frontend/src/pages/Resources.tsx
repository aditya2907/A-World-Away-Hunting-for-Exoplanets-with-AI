import Navbar from "@/components/Navbar";

const Resources = () => {
  return (
    <>
      <Navbar />
      <div className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Resources and Data</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            This project was made possible by publicly available data and research. Here are some of the key resources used in the development of our models.
          </p>
        </div>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Datasets</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  NASA Exoplanet Archive - Kepler Objects of Interest (KOI)
                </a>
                <p className="text-sm text-muted-foreground">The primary source of data for training our machine learning model, containing thousands of confirmed exoplanets and false positive candidates from the Kepler mission.</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Research Papers</h2>
            <ul className="list-disc list-inside space-y-4">
              <li>
                <a href="https://arxiv.org/abs/1709.04343" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  "Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain"
                </a>
                <p className="text-sm text-muted-foreground">A paper by Shallue & Vanderburg that demonstrated the power of deep learning for finding exoplanets in Kepler data, serving as a key inspiration for this project.</p>
              </li>
              <li>
                <a href="https://www.mdpi.com/2079-9292/13/20/3950" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  "Exoplanet Detection Using Machine Learning on Kepler Data"
                </a>
                <p className="text-sm text-muted-foreground">A relevant study on applying various machine learning techniques to the Kepler dataset for exoplanet classification.</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Tools and Libraries</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="https://www.lightkurve.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Lightkurve
                </a>
                <p className="text-sm text-muted-foreground">A Python package for Kepler and TESS data analysis, which was instrumental in our initial data exploration.</p>
              </li>
              <li>
                <a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Scikit-learn
                </a>
                <p className="text-sm text-muted-foreground">The foundation of our machine learning pipeline, used for data preprocessing and for building our Gradient Boosting model.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;

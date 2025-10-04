import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About This Project</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            "A World Away: Hunting for Exoplanets with AI" is a project dedicated to leveraging machine learning to discover and classify exoplanets from astronomical data. Our goal is to make the process of identifying potential new worlds more accessible and efficient.
          </p>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            The universe is vast, and the search for exoplanets—planets orbiting stars other than our Sun—is one of the most exciting frontiers in modern astronomy. Thousands of exoplanets have been discovered, but analyzing the massive datasets from telescopes like Kepler and TESS is a monumental task. This project aims to apply artificial intelligence to automate and enhance the detection of these distant worlds.
          </p>
          <h2 className="text-2xl font-semibold">Project Goals</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To build and train robust machine learning models capable of distinguishing real exoplanet transits from false positives.</li>
            <li>To provide an interactive web application where users can explore predictions and understand the features that drive them.</li>
            <li>To create a tool that can be used by both amateur astronomers and researchers to analyze stellar data.</li>
            <li>To raise awareness and excitement about the ongoing search for life and habitable worlds beyond our solar system.</li>
          </ul>
          <h2 className="text-2xl font-semibold">The Team</h2>
          <p>
            This project was developed by a passionate team of developers and data scientists with a shared love for space exploration and artificial intelligence.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

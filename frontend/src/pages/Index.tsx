import Hero from "@/components/Hero";
import ExoplanetAnalyzer from "@/components/ExoplanetAnalyzer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ExoplanetAnalyzer />
    </div>
  );
};

export default Index;

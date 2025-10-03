// Generate mock light curve data
export const generateLightCurve = (hasPlanet: boolean = true) => {
  const data = [];
  const transitDepth = 0.02; // 2% flux decrease during transit
  const transitDuration = 0.2; // days
  const period = 3.5; // orbital period in days
  
  for (let i = 0; i < 100; i++) {
    const time = i * 0.1; // 0.1 day intervals
    let flux = 1.0 + (Math.random() - 0.5) * 0.01; // Add noise
    
    if (hasPlanet) {
      // Add periodic transits
      const phase = (time % period) / period;
      if (phase < transitDuration / period) {
        // Transit dip
        const transitPhase = (phase / (transitDuration / period)) * Math.PI;
        flux -= transitDepth * Math.sin(transitPhase);
      }
    }
    
    // Detrended version (removed long-term trends)
    const detrended = flux - (0.0001 * time); // Simulate detrending
    
    data.push({
      time: parseFloat(time.toFixed(2)),
      flux: parseFloat(flux.toFixed(4)),
      detrended: parseFloat(detrended.toFixed(4))
    });
  }
  
  return data;
};

// Generate folded light curve (phase-folded data)
export const generateFoldedCurve = (period: number = 3.5) => {
  const data = [];
  const transitDepth = 0.02;
  
  for (let i = 0; i < 200; i++) {
    const phase = i / 200; // 0 to 1
    let flux = 1.0 + (Math.random() - 0.5) * 0.005; // Less noise in folded
    
    // Transit centered at phase 0.5
    if (Math.abs(phase - 0.5) < 0.05) {
      const transitPhase = ((phase - 0.45) / 0.1) * Math.PI;
      flux -= transitDepth * Math.sin(transitPhase);
    }
    
    data.push({
      phase: parseFloat(phase.toFixed(3)),
      flux: parseFloat(flux.toFixed(4))
    });
  }
  
  return data;
};

// Mock star candidates
export const mockStarCandidates = [
  { id: 'KIC-11904151', name: 'KIC-11904151', mission: 'Kepler', confidence: 0.96 },
  { id: 'TIC-307210830', name: 'TIC-307210830', mission: 'TESS', confidence: 0.89 },
  { id: 'KIC-8462852', name: 'KIC-8462852 (Tabby\'s Star)', mission: 'Kepler', confidence: 0.42 },
  { id: 'TIC-168789840', name: 'TIC-168789840', mission: 'TESS', confidence: 0.78 },
  { id: 'KIC-12557548', name: 'KIC-12557548', mission: 'Kepler', confidence: 0.91 },
  { id: 'TIC-400799224', name: 'TIC-400799224', mission: 'TESS', confidence: 0.15 },
];

// Predict if light curve contains a planet
export const predictPlanet = (starId: string): { confidence: number; isPlanet: boolean } => {
  const star = mockStarCandidates.find(s => s.id === starId);
  const confidence = star?.confidence ?? 0.5;
  
  return {
    confidence,
    isPlanet: confidence > 0.6
  };
};

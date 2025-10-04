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
  { id: 'KIC-11904151', name: 'KIC-11904151', mission: 'Kepler', confidence: 0.96, features: { 'kepid': 11904151, 'koi_fpflag_nt': 0, 'koi_fpflag_ss': 0, 'koi_fpflag_co': 0, 'koi_fpflag_ec': 0, 'koi_period': 0.259862, 'koi_time0bk': 131.56308, 'koi_duration': 1.781, 'ra': 292.247, 'dec': 50.2413, 'koi_pdisposition': 'CANDIDATE' } },
  { id: 'TIC-307210830', name: 'TIC-307210830', mission: 'TESS', confidence: 0.23, features: { 'kepid': 307210830, 'koi_fpflag_nt': 0, 'koi_fpflag_ss': 0, 'koi_fpflag_co': 1, 'koi_fpflag_ec': 1, 'koi_period': 3.5225, 'koi_time0bk': 133.56, 'koi_duration': 3.19, 'ra': 295.64, 'dec': 48.49, 'koi_pdisposition': 'FALSE POSITIVE' } },
  { id: 'KIC-8462852', name: 'KIC-8462852 (Tabby\'s Star)', mission: 'Kepler', confidence: 0.42, features: { 'kepid': 8462852, 'koi_fpflag_nt': 0, 'koi_fpflag_ss': 0, 'koi_fpflag_co': 0, 'koi_fpflag_ec': 0, 'koi_period': 780, 'koi_time0bk': 1500, 'koi_duration': 5, 'ra': 301.56, 'dec': 44.45, 'koi_pdisposition': 'CANDIDATE' } },
  { id: 'TIC-168789840', name: 'TIC-168789840', mission: 'TESS', confidence: 0.98, features: { 'kepid': 168789840, 'koi_fpflag_nt': 0, 'koi_fpflag_ss': 0, 'koi_fpflag_co': 0, 'koi_fpflag_ec': 0, 'koi_period': 11.8, 'koi_time0bk': 134.45, 'koi_duration': 2.4, 'ra': 289.27, 'dec': 40.05, 'koi_pdisposition': 'CONFIRMED' } },
  { id: 'KIC-12557548', name: 'KIC-12557548', mission: 'Kepler', confidence: 0.91, features: { 'kepid': 12557548, 'koi_fpflag_nt': 0, 'koi_fpflag_ss': 0, 'koi_fpflag_co': 0, 'koi_fpflag_ec': 0, 'koi_period': 0.6535, 'koi_time0bk': 131.56, 'koi_duration': 1.2, 'ra': 290.0, 'dec': 51.3, 'koi_pdisposition': 'CONFIRMED' } },
  { id: 'TIC-400799224', name: 'TIC-400799224', mission: 'TESS', confidence: 0.15, features: { 'kepid': 400799224, 'koi_fpflag_nt': 1, 'koi_fpflag_ss': 1, 'koi_fpflag_co': 1, 'koi_fpflag_ec': 1, 'koi_period': 1.2, 'koi_time0bk': 131.9, 'koi_duration': 0.5, 'ra': 299.5, 'dec': 45.7, 'koi_pdisposition': 'FALSE POSITIVE' } },
];

// Predict if light curve contains a planet
export const predictPlanet = (starId: string): { confidence: number; isPlanet: boolean } => {
  const star = mockStarCandidates.find(s => s.id === starId);
  const confidence = star?.features.koi_pdisposition === 'FALSE POSITIVE' ? 0.2 : 0.9;
  
  return {
    confidence,
    isPlanet: confidence > 0.6
  };
};

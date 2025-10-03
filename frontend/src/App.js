import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Exoplanet Discovery Hub</h1>
        <p>Explore distant worlds and uncover the secrets of the cosmos.</p>
      </header>
      <main>
        <div className="search-container">
          <input type="text" placeholder="Enter star or planet name..." />
          <button>Search</button>
        </div>
        <div className="results-container">
          {/* Results will be displayed here */}
        </div>
      </main>
    </div>
  );
}

export default App;

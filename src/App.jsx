import { useEffect } from 'react';
import './App.css';
import { useStore } from './store';
import Dashboard from './components/Dashboard';

function App() {
  // Prendiamo la funzione fetchResources dallo store
  const fetchResources = useStore((state) => state.fetchResources);

  // BOOTSTRAPPING
  // L'unico useEffect dell'app! Serve solo per caricare i dati all'avvio.
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <div className="App">
      <h1>🚀 Space Cargo Manager</h1>
      <p>Stazione Spaziale Alpha - Monitoraggio Risorse</p>

      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

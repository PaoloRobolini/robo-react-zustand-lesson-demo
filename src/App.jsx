import { useEffect } from 'react';
import './App.css';
import { useStore } from './store';
import Dashboard from './components/Dashboard';

function App() {
  // Prendiamo la funzione fetchResources dallo store
  const fetchResources = useStore((state) => state.fetchResources);
  const subscribeToUpdates = useStore((state) => state.subscribeToUpdates);

  // BOOTSTRAPPING
  // L'unico useEffect dell'app! Serve solo per caricare i dati all'avvio.
  useEffect(() => {
    fetchResources();

    // Attiviamo la sottoscrizione Realtime
    const unsubscribe = subscribeToUpdates();

    // Cleanup quando il componente viene smontato
    return () => unsubscribe();
  }, [fetchResources, subscribeToUpdates]);

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

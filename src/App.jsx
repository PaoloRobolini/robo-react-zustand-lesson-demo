import { useEffect, useState } from 'react'
import './App.css'
import { useStore } from './store'
import Dashboard from './components/Dashboard'

function App() {
  // Prendiamo la funzione fetchResources dallo store
  const fetchResources = useStore((state) => state.fetchResources)
  const subscribeToUpdates = useStore((state) => state.subscribeToUpdates)
  // Prendiamo la funzione addResource dallo store
  const addResource = useStore((state) => state.addResource)

  // Stato per mostrare/nascondere il form
  const [showForm, setShowForm] = useState(false)

  // BOOTSTRAPPING
  // L'unico useEffect dell'app! Serve solo per caricare i dati all'avvio.
  useEffect(() => {
    fetchResources()

    // Attiviamo la sottoscrizione Realtime
    const unsubscribe = subscribeToUpdates()

    // Cleanup quando il componente viene smontato
    return () => unsubscribe()
  }, [fetchResources, subscribeToUpdates]);

  // Funzione per gestire il submit del form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const nome = (f.nome.value || '').trim();
    const quantita = parseInt(f.quantita.value || '0', 10) || 0;
    const unit = (f.unit.value || '').trim();
    const type = f.type.value;
    const obj = {
      'name': nome,
      'quantity': Number(quantita),
      'unit': unit,
      'type': type
    };
    console.log(`Gli passo ${JSON.stringify(obj)}`)
    addResource(obj); // Salva nello store Zustand
    f.reset();
    setShowForm(false);
  };

  return (
    <div className="App">
      {/* Bottone per aprire il form */}
      <button
        id="form_aggiunta"
        type="button"
        onClick={() => setShowForm((v) => !v)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'linear-gradient(90deg,#06b6d4,#3b82f6)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 10,
          boxShadow: '0 6px 14px rgba(59,130,246,0.25)',
          cursor: 'pointer',
          userSelect: 'none',
          fontWeight: 600,
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          border: 'none',
          marginBottom: 16,
        }}
      >
        + Aggiungi risorsa
      </button>

      {/* Popup form */}
      {showForm && (
        <div
          style={{
            position: 'absolute',
            right: 30,
            top: 70,
            width: 320,
            background: '#0f172a',
            color: '#e6edf3',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 10px 30px rgba(2,6,23,0.6)',
            zIndex: 999,
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Nuova Risorsa</div>
            <input
              name="nome"
              placeholder="Nome (es. Ossigeno)"
              required
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                color: '#e6edf3',
                outline: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                name="quantita"
                type="number"
                placeholder="Quantità"
                required
                min="0"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  color: '#e6edf3',
                }}
              />
              <input
                name="unit"
                placeholder="Unità (es. kg)"
                style={{
                  width: 90,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  color: '#e6edf3',
                }}
              />
            </div>
            <select
              name="type"
              defaultValue="solid"
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                color: '#e6edf3',
              }}
            >
              <option value="solid">solid</option>
              <option value="liquid">liquid</option>
              <option value="gas">gas</option>
            </select>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(90deg,#10b981,#06b6d4)',
                  color: '#04202a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Salva
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'transparent',
                  color: '#e6edf3',
                  cursor: 'pointer',
                }}
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      )}
      <h1>🚀 Space Cargo Manager</h1>
      <p>Stazione Spaziale Alpha - Monitoraggio Risorse</p>

      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

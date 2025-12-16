# Workshop: "Space Cargo Manager"

- Stack: React + Zustand
- Livello: Intermedio (Richiede basi di React)

## Lo Scenario
Non stiamo più solo contando numeri. Sei l'ufficiale IT della Stazione Spaziale Alpha. Devi costruire un pannello di controllo per monitorare le risorse vitali (Ossigeno, Carburante, Cibo).

Il problema: I sensori sono lenti, ma l'equipaggio ha bisogno di un'interfaccia reattiva immediata. La soluzione: Usare Zustand per gestire lo stato locale e sincronizzarlo con il database.

## Architettura e Requisiti

### Obiettivi didattici:
- Gestire uno stato complesso (array di oggetti) invece di un singolo numero.
- Separare la logica di business (Store) dalla UI (Componenti).
- Implementare "Optimistic Updates": la UI si aggiorna subito, poi chiama il server.

### Vincoli Hardcore:
- Nessun `useState` per i dati delle risorse.
- Nessun "Prop Drilling" (passare lo stato di padre in figlio).
- `useEffect` consentito solo una volta nell'App.jsx per il caricamento iniziale (bootstrapping).

---

## Come Usare Questo Repository

Questa lezione è strutturata passo-passo. Puoi seguire l'evoluzione del codice attraverso la cronologia di **Git**.

### 1. Per Iniziare
Clona il repository e installa le dipendenze:
```bash
git clone <tuo-repo>
cd react-zustand-lesson-demo
pnpm install
pnpm dev
```

### 2. Segui la Lezione
Apri il file `LESSON.md`. Troverai la spiegazione teorica di ogni passo.
Ogni capitolo di `LESSON.md` corrisponde a un commit Git.

Per vedere il codice com'era in un punto specifico, puoi usare:
```bash
git log --oneline
# Trova l'hash del commit (es. "Step 1: Mock API setup")
git checkout <hash>
```

### 3. I Passaggi (Branch/Commit)
- **Step 1**: Mock API (Simulazione server).
- **Step 2**: The Store (Configurazione Zustand).
- **Step 3**: UI Implementation (Connessione Componenti).
- **Step 4**: Optimistic Updates (Interattività).
- **Step 5**: Bonus Realtime (Sincronizzazione istantanea).

Buon divertimento, cadetti! 🚀
# Lezione: Gestione dello Stato con Zustand (Space Cargo Manager)

Benvenuti nella lezione! Impareremo a gestire lo stato di un'applicazione React utilizzando **Zustand**, una libreria leggera e potente.

Il nostro obiettivo è costruire la dashboard della **Stazione Spaziale Alpha**, monitorando risorse critiche come Ossigeno, Carburante e Cibo.

## Perché Zustand?
A differenza di `useState` (che è locale al componente) o `Context API` (che può diventare verboso e causare re-render non necessari), Zustand ci permette di:
1.  Creare uno **store globale** accessibile da qualsiasi componente.
2.  Aggiornare lo stato in modo semplice (senza reducer complessi).
3.  Ottimizzare le performance (i componenti si aggiornano solo se i dati che osservano cambiano).

## Struttura della Lezione
Ogni step di questa lezione corrisponde a un commit nel repository.
1.  **Step 1**: Creazione di una Mock API (per simulare il server).
2.  **Step 2**: Configurazione dello Store Zustand.
3.  **Step 3**: Creazione della UI e lettura dati.
4.  **Step 4**: Aggiornamento dati (Optimistic Updates).

---

## Step 1: Mock API (Il "Server" finto)

In un'applicazione reale, il frontend parla con un backend (API). Per concentrarci su React e Zustand, useremo una "Mock API" (`src/api.js`).

### Cosa abbiamo fatto:
1.  Creato un file `src/api.js` che esporta oggetto `api`.
2.  Implementato `fetchResources()` che restituisce una Promise (simulate network delay).
3.  Implementato `updateResource()` per modificare i dati.
4.  Aggiunto un sistema semplice di `subscribe` che useremo nel **Bonus Step** per simulare eventi realtime.

### Concetti Chiave:
- **Asincronicità**: Le chiamate al server non sono immediate. La nostra UI dovrà mostrare uno stato di "loading".
- **Separation of Concerns**: L'API gestisce i dati grezzi, la UI gestisce la visualizzazione, e lo Store (che faremo dopo) farà da ponte.

---

## Step 2: Lo Store (Il Cervello dell'App)

Ora creiamo il cuore dell'applicazione: lo Store Zustand.
In Zustand, lo store è un hook personalizzato (di solito chiamato `useStore`).

### Cosa abbiamo fatto:
1.  Creato `src/store.js`.
2.  Definito lo stato iniziale: `resources` (array vuoto), `isLoading` (boolean), `error` (null o string).
3.  Creata l'azione `fetchResources`:
    - Imposta `isLoading: true`.
    - Chiama `api.fetchResources()`.
    - Se ha successo, mette i dati nello stato e spegne il loading.
    - Se fallisce, salva l'errore.

### Codice Chiave
```javascript
export const useStore = create((set) => ({
  resources: [],
  fetchResources: async () => {
    set({ isLoading: true });
    const data = await api.fetchResources();
    set({ resources: data, isLoading: false });
  }
}));
```
Notate come `set` unisce automaticamente il nuovo stato con quello vecchio (shallow merge). Non serve fare `set(state => ({ ...state, isLoading: true }))`!

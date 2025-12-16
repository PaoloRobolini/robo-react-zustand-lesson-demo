# Workshop: "Space Cargo Manager"

- Stack: React + Zustand + PocketBase 
- Livello: Intermedio (Richiede basi di React)

## Lo Scenario
Non stiamo più solo contando numeri. Sei l'ufficiale IT della Stazione Spaziale Alpha. Devi costruire un pannello di controllo per monitorare le risorse vitali (Ossigeno, Carburante, Cibo).

Il problema: I sensori (PocketBase) sono lenti, ma l'equipaggio ha bisogno di un'interfaccia reattiva immediata. La soluzione: Usare Zustand per gestire lo stato locale e sincronizzarlo con il database.

## Architettura e Requisiti

### Obiettivi didattici:

- Gestire uno stato complesso (array di oggetti) invece di un singolo numero.
- Separare la logica di business (Store) dalla UI (Componenti).
- Implementare "Optimistic Updates": la UI si aggiorna subito, poi chiama il server.

### Vincoli Hardcore:

- Nessun useState per i dati delle risorse.
- Nessun "Prop Drilling" (passare lo stato di padre in figlio).
- useEffect consentito solo una volta nell'App.jsx per il caricamento iniziale (bootstrapping).
/**
 * MOCK API
 * Simula il comportamento di un server remoto (es. PocketBase) con latenza artificiale.
 */

const INITIAL_DATA = [
  { id: 1, name: 'Oxygen', quantity: 95, type: 'gaz', unit: '%' },
  { id: 2, name: 'Fuel', quantity: 80, type: 'liquid', unit: '%' },
  { id: 3, name: 'Food', quantity: 45, type: 'solid', unit: 'kg' },
];

let resources = [...INITIAL_DATA];
let listeners = [];

// Latency simulator (wait for 500ms - 1500ms)
const wait = (min = 500, max = 1500) =>
  new Promise((resolve) =>
    setTimeout(resolve, min + Math.random() * (max - min))
  );

export const api = {
  // [READ] Leggi tutte le risorse
  fetchResources: async () => {
    await wait();
    // A volte simula un errore casuale (opzionale, per ora disabilitato)
    // if (Math.random() > 0.9) throw new Error("Connection lost");
    return [...resources];
  },

  // [UPDATE] Aggiorna una risorsa specifica
  updateResource: async (id, newQuantity) => {
    await wait(300, 800);
    const index = resources.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Resource not found');
    
    resources[index] = { ...resources[index], quantity: newQuantity };
    
    // Notifica i listeners (per il bonus Realtime)
    listeners.forEach((l) => l(id, resources[index]));
    
    return resources[index];
  },

  // [BONUS] Realtime subscription dummy implementation
  subscribe: (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  },
};

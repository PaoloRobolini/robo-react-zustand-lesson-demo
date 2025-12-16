import PocketBase from 'pocketbase';

/**
 * POCKETBASE API
 * Connette l'applicazione a un'istanza locale di PocketBase.
 * URL Default: http://127.0.0.1:8090
 * 
 * Requisiti Collection 'resources' in PocketBase:
 * - name (text)
 * - quantity (number)
 * - unit (text)
 * - type (select/text: 'gas', 'liquid', 'solid')
 */

const pb = new PocketBase('http://127.0.0.1:8090');

// Disabilita auto-cancellation per evitare abort error in React strict mode
pb.autoCancellation(false);

export const api = {
  // [READ] Leggi tutte le risorse
  fetchResources: async () => {
    // Richiede la lista ordinata per nome
    const records = await pb.collection('resources').getList(1, 50, {
      sort: 'name',
    });
    return records.items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      type: item.type
    }));
  },

  // [UPDATE] Aggiorna una risorsa specifica
  updateResource: async (id, newQuantity) => {
    const record = await pb.collection('resources').update(id, {
      quantity: newQuantity
    });
    return {
      id: record.id,
      name: record.name,
      quantity: record.quantity,
      unit: record.unit,
      type: record.type
    };
  },

  // [REALTIME] Sottoscrizione agli aggiornamenti
  subscribe: (callback) => {
    // Sottoscriviti a tutti i cambiamenti nella collection 'resources'
    pb.collection('resources').subscribe('*', (e) => {
      if (e.action === 'update') {
        const updatedResource = {
          id: e.record.id,
          name: e.record.name,
          quantity: e.record.quantity,
          unit: e.record.unit,
          type: e.record.type
        };
        // Chiama la callback fornita dallo store
        callback(updatedResource.id, updatedResource);
      }
    });

    // Ritorna una funzione di cleanup
    return () => {
      pb.collection('resources').unsubscribe('*');
    };
  },
};

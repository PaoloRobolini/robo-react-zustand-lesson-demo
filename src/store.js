import { create } from 'zustand';
import { api } from './api';

/**
 * ZUSTAND STORE
 *
 * Qui definiamo lo stato globale dell'applicazione.
 * create() accetta una funzione (set, get) che restituisce l'oggetto di stato.
 */
export const useStore = create((set, get) => ({
    // STATO INIZIALE
    resources: [],  // Lista delle risorse (vuota all'inizio)
    isLoading: false, // Flag per mostrare il caricamento
    error: null,      // Per gestire eventuali errori

    // AZIONI (Functioni per modificare lo stato)

    // 1. Fetch dei dati (Asincrona)
    fetchResources: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await api.fetchResources();
            set({ resources: data, isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    // 2. Aggiornamento Risorsa (Optimistic Update)
    updateResource: async (id, delta) => {
        // 1. Salva lo stato precedente (per eventuale rollback)
        const previousResources = get().resources;

        // 2. Calcola il nuovo stato
        const newResources = previousResources.map((res) => {
            if (res.id === id) {
                let newQty = res.quantity + delta;
                if (newQty < 0) newQty = 0;
                if (newQty > 100 && res.unit === '%') newQty = 100;
                return { ...res, quantity: newQty };
            }
            return res;
        });

        // 3. AGGIORNA SUBITO LA UI (Optimistic)
        set({ resources: newResources, error: null });

        // 4. Chiama l'API
        try {
            const updatedItem = newResources.find(r => r.id === id);
            await api.updateResource(id, updatedItem.quantity);
        } catch (err) {
            // 5. ROLLBACK in caso di errore
            console.error("Update failed, rolling back", err);
            set({ resources: previousResources, error: "Errore salvataggio: " + err.message });
        }
    },

    // 3. AGGIUNGI UNA RISORSA
    addResource: async (resource) => {
        // console.log(`Ho ricevuto la risorsa ${JSON.stringify(resource)}`)
        console.log("arriva alla creazione")
        set({ isLoading: true, error: null });
        try {
            const response = await api.create(resource)
            console.log(`Lo store ha correttamente aggiunto ${JSON.stringify(resource)}`)
            set({ resources: [response, ...get().resources], isLoading: false });
        } catch (e) {
            set({isLoading: false, error: e})
            console.log(`Errore nella creazione: ${e}`)
        }
    },

    // BONUS: Realtime Subscriptions
    subscribeToUpdates: () => {
        // Chiama la funzione subscribe dell'API
        // Quando arriva un aggiornamento (callback), aggiorniamo lo Store
        const unsubscribe = api.subscribe((id, updatedResource) => {
            console.log(`[Realtime] Received update for ${updatedResource.name}`);

            set((state) => ({
                resources: state.resources.map((res) =>
                    res.id === id ? updatedResource : res
                )
            }));
        });

        // Ritorniamo la funzione di pulizia (per quando il componente si smonta)
        return unsubscribe;
    }
}));

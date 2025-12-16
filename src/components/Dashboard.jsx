import React from 'react';
import { useStore } from '../store';
import ResourceCard from './ResourceCard';

const Dashboard = () => {
    // SELEZIONE DELLO STATO (State Selection)
    // Prendiamo solo ciò che serve (buona pratica!)
    const resources = useStore((state) => state.resources);
    const isLoading = useStore((state) => state.isLoading);
    const error = useStore((state) => state.error);

    if (isLoading) return <div style={{ color: 'white' }}>Caricamento risorse... (Loading...)</div>;
    if (error) return <div style={{ color: 'red' }}>Errore: {error}</div>;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {resources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
            ))}
        </div>
    );
};

export default Dashboard;

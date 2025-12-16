import React from 'react';

const ResourceCard = ({ resource }) => {
    const getColor = (quantity) => {
        if (quantity < 30) return 'red';
        if (quantity < 60) return 'orange';
        return 'green';
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            margin: '10px',
            width: '200px',
            backgroundColor: '#2a2a2a',
            color: 'white'
        }}>
            <h3>{resource.name}</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {resource.quantity} {resource.unit}
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#555',
                borderRadius: '5px',
                marginTop: '10px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${resource.quantity}%`,
                    height: '100%',
                    backgroundColor: getColor(resource.quantity),
                    transition: 'width 0.5s ease'
                }} />
            </div>
        </div>
    );
};

export default ResourceCard;

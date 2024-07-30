import React from 'react';
import { useWG } from '../Context/WGContext';

const WGInfoComponent: React.FC = () => {
    const { wg } = useWG();

    return (
        <div>
            <h2>WG Informationen</h2>
            {wg ? (
                <div>
                    <p>WG-ID: {wg.id}</p>
                    <p>WG-Name: {wg.name}</p>
                    <h3>Mitglieder:</h3>
                    <ul>
                        {wg.members.map(member => (
                            <li key={member.uid}>{member.displayName} ({member.email})</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Keine WG Informationen verfügbar</p>
            )}
        </div>
    );
};

export default WGInfoComponent;

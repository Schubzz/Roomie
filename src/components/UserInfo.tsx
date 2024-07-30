import React from 'react';
import { useUser } from '../Context/UserContext';

const UserInfoComponent: React.FC = () => {
    const { user } = useUser();

    return (
        <div>
            <h2>Benutzerinformationen</h2>
            {user ? (
                <div>
                    <p>UID: {user.uid}</p>
                    <p>Email: {user.email}</p>
                    <p>DisplayName: {user.displayName}</p>
                    <p>WG-ID: {user.wgId}</p>
                </div>
            ) : (
                <p>Keine Benutzerinformationen verfügbar</p>
            )}
        </div>
    );
};

export default UserInfoComponent;

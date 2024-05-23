import React from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';

const ListItem = ({ item, onEdit, onDelete }) => {
    return (
        <IonItem>
            <IonLabel>{item.name}</IonLabel>
            <IonButton onClick={onEdit}>Bearbeiten</IonButton>
            <IonButton onClick={onDelete}>Löschen</IonButton>
        </IonItem>
    );
};

export default ListItem;

import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface ContractsFilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

const ContractsFilter: React.FC<ContractsFilterProps> = ({ filter, setFilter }) => {
    return (
        <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as string)}>
            <IonSegmentButton value="all">
                <IonLabel>Alle Verträge</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="mine">
                <IonLabel>Meine Verträge</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default ContractsFilter;

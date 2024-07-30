import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

interface FinanceFilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

const FinanceFilter: React.FC<FinanceFilterProps> = ({ filter, setFilter }) => {
    return (
        <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as string)}>
            <IonSegmentButton value="expenses">
                <IonLabel>Ausgaben</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="balances">
                <IonLabel>Salden</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default FinanceFilter;

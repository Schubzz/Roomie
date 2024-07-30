import React from 'react';
import {IonInput, IonButton, IonIcon, IonTextarea, IonItem, IonLabel, IonSelectOption, IonSelect} from '@ionic/react';
import { add } from 'ionicons/icons';

const FinanceInput: React.FC<{
    title: string,
    setTitle: (value: string) => void,
    info: string,
    setInfo: (value: string) => void,
    amount: number,
    setAmount: (value: number) => void,
    paidBy: string,
    setPaidBy: (value: string) => void,
    sharedWith: string[],
    setSharedWith: (value: string[]) => void,
    onSubmit: () => void
}> = ({
          title,
          setTitle,
          info,
          setInfo,
          amount,
          setAmount,
          paidBy,
          setPaidBy,
          sharedWith,
          setSharedWith,
          onSubmit
      }) => {
    const handleSharedWithChange = (e: CustomEvent) => {
        const options = e.detail.value;
        setSharedWith(options);
    };

    return (
        <div className="finance-input-container">
            <IonItem>
                <IonLabel position="stacked">Titel</IonLabel>
                <IonInput
                    value={title}
                    onIonInput={(e) => setTitle(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Info</IonLabel>
                <IonTextarea
                    value={info}
                    onIonInput={(e) => setInfo(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Betrag</IonLabel>
                <IonInput
                    type="number"
                    value={amount}
                    onIonInput={(e) => setAmount(parseFloat(e.detail.value!))}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Bezahlt von</IonLabel>
                <IonSelect
                    value={paidBy}
                    onIonChange={(e) => setPaidBy(e.detail.value)}
                >
                    {/* Dummy Data */}
                    <IonSelectOption value="user1">User 1</IonSelectOption>
                    <IonSelectOption value="user2">User 2</IonSelectOption>
                    {/* Replace with dynamic data */}
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Geteilt mit</IonLabel>
                <IonSelect
                    multiple={true}
                    value={sharedWith}
                    onIonChange={handleSharedWithChange}
                >
                    {/* Dummy Data */}
                    <IonSelectOption value="user1">User 1</IonSelectOption>
                    <IonSelectOption value="user2">User 2</IonSelectOption>
                    {/* Replace with dynamic data */}
                </IonSelect>’
            </IonItem>
            <IonButton
                expand="block"
                onClick={onSubmit}
                color="success"
            >
                Hinzufügen
                <IonIcon icon={add} slot="end" />
            </IonButton>
        </div>
    );
};

export default FinanceInput;

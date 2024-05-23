import React from 'react';
import { IonInput } from '@ionic/react';

const Input = ({ type, value, onChange, placeholder }) => {
    return (
        <IonInput type={type} value={value} onIonChange={onChange} placeholder={placeholder} />
    );
};

export default Input;

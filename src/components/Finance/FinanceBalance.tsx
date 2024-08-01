import React from 'react';
import {IonButton, IonIcon} from '@ionic/react';
import {useWG} from '../../Context/WGContext';
import {cashOutline, checkmark, walletOutline} from "ionicons/icons";

const FinanceBalance: React.FC<{
    balances: { [key: string]: { amount: number; creditor: string; debtor: string }[] },
    settleBalance: (amount: number, creditor: string, debtor: string) => void
}> = ({balances, settleBalance}) => {
    const {wg} = useWG();
    const balanceEntries = Object.entries(balances);

    const getDisplayName = (uid: string) => {
        const member = wg?.members.find((member) => member.uid === uid);
        return member ? member.displayName : 'Unbekannt';
    };

    return (
        <div className="balance-container">
            {balanceEntries.length > 0 ? (
                balanceEntries.map(([key, transactions]) => (
                    transactions.map((transaction, index) => (
                        <div key={`${key}-${index}`} className="balance-item">
                            <div>
                                <IonIcon icon={cashOutline}/>
                            </div>
                            <div className="item-label">
                                <p className="item-title">
                                    <span className="debtor">{getDisplayName(transaction.debtor)}</span> schuldet <span
                                    className="creditor">{getDisplayName(transaction.creditor)}</span>
                                </p>
                            </div>
                            <div>
                                <p className="item-amount">{Math.abs(transaction.amount)} €</p>
                            </div>
                        </div>
                    ))
                ))
            ) : (
                <p>Keine Salden verfügbar</p>
            )}
        </div>
    );
};

export default FinanceBalance;

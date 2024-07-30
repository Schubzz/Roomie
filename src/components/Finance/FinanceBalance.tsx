import React from 'react';
import { useWG } from '../../Context/WGContext';

const FinanceBalance: React.FC<{
    balances: { [key: string]: { amount: number; creditor: string; debtor: string }[] }
}> = ({ balances }) => {
    const { wg } = useWG();
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
                            <p>
                                {getDisplayName(transaction.debtor)} schuldet {getDisplayName(transaction.creditor)} {Math.abs(transaction.amount)} €
                            </p>
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

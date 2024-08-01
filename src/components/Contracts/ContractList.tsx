import React from 'react';
import ContractItem from './ContractItem';

interface ContractItemProps {
    id: string;
    title: string;
    cost: string;
    owner: string;
    category: string;
    createdAt: Date;
}

interface ContractListProps {
    contracts: ContractItemProps[];
    deleteItem: (id: string) => void;
    openModal: (item: ContractItemProps) => void;
    categories: { name: string, icon: string, color: string }[]; // Ensure categories is passed down to ContractList
}

const ContractList: React.FC<ContractListProps> = ({ contracts, deleteItem, openModal, categories }) => {
    return (
        <div className="contract-item-container">
            {contracts.map(contract => (
                <ContractItem
                    key={contract.id}
                    item={contract}
                    deleteItem={deleteItem}
                    openModal={openModal}
                    categories={categories} // Ensure categories is passed down to ContractItem
                />
            ))}
        </div>
    );
};

export default ContractList;

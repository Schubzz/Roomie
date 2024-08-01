import React from 'react';
import { IonIcon, IonChip, IonLabel } from '@ionic/react';
import { repeatOutline, calendarOutline, ellipsisHorizontal, checkmarkCircle } from 'ionicons/icons';
import { useWG } from '../../Context/WGContext';
import { useUser } from "../../Context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    assignedTo: string[];
    rotation: string;
    startDay: string;
    status: string;
}

const TaskItem: React.FC<{
    item: TaskItemProps,
    deleteItem: (id: string) => void,
    openModal: (item: TaskItemProps) => void,
    markAsDone: (taskId: string) => void,
    getRotationIcon: (rotation: string) => string,
    getDayIcon: (startDay: string) => string
}> = ({ item, openModal, markAsDone, getRotationIcon, getDayIcon }) => {
    const { wg } = useWG();
    const { user } = useUser();

    const getDisplayNames = (uids: string[]) => {
        const names = uids.map(uid => {
            const member = wg?.members.find(member => member.uid === uid);
            return member ? member.displayName : "Unbekannt";
        });
        if (uids.length === 1 || item.rotation === 'none') {
            return names.map(name => (
                <IonChip key={name}>
                    <IonLabel>{name}</IonLabel>
                </IonChip>
            ));
        }
        const current = names[0];
        const next = names.length > 1 ? names[1] : "Niemand";
        return (
            <>
                <IonChip key={current} outline={false} color="primary" className="contract-owner">
                    <p>{current}</p>
                </IonChip>
                <IonIcon icon={ellipsisHorizontal} className="user-divider" />
                <IonChip key={next} outline={true} className="contract-owner">
                    <p>{next}</p>
                </IonChip>
            </>
        );
    };

    const displayNames = getDisplayNames(item.assignedTo);

    const handleMarkAsDone = async (e: React.MouseEvent) => {
        e.stopPropagation();  // Verhindert, dass der Modal beim Klicken auf das Check-Icon geöffnet wird
        if (item.assignedTo.includes(user?.uid || '')) {
            const newStatus = item.status === 'done' ? 'pending' : 'done';
            const itemDoc = doc(db, `wgs/${wg.id}/tasks`, item.id);
            await updateDoc(itemDoc, {
                status: newStatus
            });
            markAsDone(item.id);
        }
    };

    return (
        <div key={item.id} className="task-item" onClick={() => openModal(item)}>
            <div className="item-content">
                <div className="task-item-header">
                    <p className="item-title">{item.title}</p>
                    <div className="item-assigned-to">
                        {displayNames}
                    </div>
                </div>
                <div>
                    <p className={`item-status ${item.status === 'done' ? 'done' : ''}`}>
                        {item.status === 'done' ? 'erledigt' : 'ausstehend'}
                    </p>
                    <div className="task-infos">
                        <div className="item-rotation">
                            <IonIcon icon={repeatOutline} />
                            <span>{getRotationIcon(item.rotation)}</span>
                        </div>
                        <div className="item-due-date">
                            <IonIcon icon={calendarOutline} />
                            <span>{getDayIcon(item.startDay)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item-actions">
                {item.assignedTo.includes(user?.uid || '') && (
                    <IonIcon
                        icon={checkmarkCircle}
                        size="large"
                        onClick={handleMarkAsDone}
                        className={`checkmark-icon ${item.status === 'done' ? 'done' : ''}`}
                    />
                )}
            </div>
        </div>
    );
};

export default TaskItem;

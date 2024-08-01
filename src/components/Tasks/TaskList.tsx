import React from 'react';
import TaskItem from './TaskItem';

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

interface TaskListProps {
    tasks: TaskItemProps[];
    deleteItem: (id: string) => void;
    openModal: (item: TaskItemProps) => void;
    markAsDone: (taskId: string) => void;
    getRotationIcon: (rotation: string) => string;
    getDayIcon: (startDay: string) => string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteItem, openModal, markAsDone, getRotationIcon, getDayIcon }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    item={task}
                    deleteItem={deleteItem}
                    openModal={openModal}
                    markAsDone={markAsDone}
                    getRotationIcon={getRotationIcon}
                    getDayIcon={getDayIcon}
                />
            ))}
        </div>
    );
};

export default TaskList;

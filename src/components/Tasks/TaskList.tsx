import React from 'react';
import TaskItem from './TaskItem';

interface TaskItemProps {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    assignedTo: string[];
    rotation: string;
    status: string;
}

interface TaskListProps {
    tasks: TaskItemProps[];
    deleteItem: (id: string) => void;
    openModal: (item: TaskItemProps) => void;
    markAsDone: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteItem, openModal, markAsDone }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    item={task}
                    deleteItem={deleteItem}
                    openModal={openModal}
                    markAsDone={markAsDone}
                />
            ))}
        </div>
    );
};

export default TaskList;

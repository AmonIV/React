import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, getAllTasks, getAllTasksForAuthor, saveTask, TaskStatus } from "../../../utils/http-utils/task-requests";
import { TaskCard } from "../task-card/TaskCard";

import './TasksList.scss';

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllTasksForAuthor(params.id).then(response => {
                setTasks(response.data);
            });
        }
        else {
            getAllTasks().then(response => {
                setTasks(response.data);
            });
        }
        
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const task = tasks.find(task => task.id === id);
        task.status = status;
        saveTask(task).then(() => {
            setTasks([...tasks]);
        });
    }

    const getTasksWithStatus = (status) => {
        return tasks.filter(task => task.status === status).map(task => <TaskCard key={task.id} task={task} onTaskDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />)
    }

    const onDropHandler = (event, status) => {
        event.preventDefault();

        const taskId = event.dataTransfer.getData('taskId');
        onChangeStatusHandler(status, taskId);
    }

    return (
        <div className="tasks-list-wrapper">
            {/* { tasks.map(task => <TaskCard key={task.id} task={task} onTaskDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) } */}

            <div className="status new" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, TaskStatus.NEW)}>
                <div className="column-header">New</div>
                { getTasksWithStatus(TaskStatus.NEW) }
            </div>
            <div className="status in-progress" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, TaskStatus.IN_PROGRESS)}>
                <div className="column-header">In Progress</div>
                { getTasksWithStatus(TaskStatus.IN_PROGRESS) }
            </div>
            <div className="status in-review"  onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, TaskStatus.IN_REVIEW)}>
                <div className="column-header">In review</div>
                { getTasksWithStatus(TaskStatus.IN_REVIEW) }
            </div>
            <div className="status done" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, TaskStatus.DONE)}>
                <div className="column-header">Done</div>
                { getTasksWithStatus(TaskStatus.DONE) }
            </div>
        </div>
    );
}
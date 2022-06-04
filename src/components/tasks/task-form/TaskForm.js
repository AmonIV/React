import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, saveTask, TaskStatus } from "../../../utils/http-utils/task-requests";
import './TaskForm.scss';

export function TaskForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: ''
    });

    useEffect(() => {
        if (params.id) {
            getTaskById(params.id).then((response) => {
                setTask(response.data);
            });
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSubmit = (event) => {
        event.preventDefault();

        saveTask(task).then(() => {
            navigate('/tasks-list');
        });
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onTaskSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" value={task.title} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name="description" value={task.description} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Due date" name="dueDate" value={task.dueDate} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Form.Select placeholder="Select Status" name="status" value={task.status} onChange={onInputChange}> 
                        { Object.keys(TaskStatus).map(status => <option key={status} value={TaskStatus[status]}>{TaskStatus[status]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">{task.id ? 'Edit Task' : 'Create task'}</Button>
            </Form>
        </div>
    );
}
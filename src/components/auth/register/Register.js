import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../../utils/http-utils/customer-requests";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.scss';

export function Register() {

    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        isActive: false,
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setCustomer((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        registerCustomer(customer).then(() => {
            navigate('/customers-list');
        })
            .catch(error => setError(error.message));

    }

    return (
        <div className="customer-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                {error && <span className="text-danger">{error}</span>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="fullName" value={customer.fullName} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={customer.phone} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password} onChange={onInputChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Link to='/login'>Already have an account?</Link>
            </Form>
        </div>
    );
}
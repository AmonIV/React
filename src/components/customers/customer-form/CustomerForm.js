import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CustomerForm.scss';
import { getLoggedCustomer, getCustomerById, saveCustomer } from '../../../utils/http-utils/customer-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function CustomerForm() {

    const loggedCustomer = getLoggedCustomer();
    const params = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        isActive: false,
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: 'customer'
    });

    useEffect(() => {
        if (params.id) {
            getCustomerById(params.id).then(response => {
                setCustomer(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveCustomer(customer).then(() => {
            console.log('Success');
            navigate('/customers-list');
        });
    }

    const onInputChange = (event) => {        
        let value = event.target.value;
        if (event.target.name === 'isActive') {
            value = event.target.checked;
        }

        setCustomer((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    const getAdminControls = () => {
        if (loggedCustomer.role === "admin") {
            return (
                <>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Active" name="isActive" checked={customer.isActive} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Select name="role" value={customer.role} onChange={onInputChange}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </Form.Select>
                </Form.Group>
                </>
            );
                
        }
    }

    return (
        <div className="customer-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="fullName" value={customer.fullName} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={customer.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={customer.phone} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={customer.password} onChange={onInputChange}/>
                </Form.Group>

                { getAdminControls() }

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
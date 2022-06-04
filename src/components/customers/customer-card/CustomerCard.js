import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedCustomer } from '../../../utils/http-utils/customer-requests';
import './CustomerCard.scss';

export function CustomerCard({ customer, deleteCustomer, isInDetails }) {

    const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();
    
    const redirectToDetails = () => {
        navigate(`/customer/${customer.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/customer/edit/${customer.id}`);
    }

    if (!customer) {
        return <p>No Customer!</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{ customer.fullName }</Card.Title>
                <Card.Text>
                    <span className='key'>Email: </span>
                    <span className='value'>{customer.email}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Phone: </span>
                    <span className='value'>{customer.phone}</span>
                </Card.Text>
                <div className='btn-holder'>
                    <Button variant="primary" onClick={redirectToEdit}>Edit</Button>
                    { loggedCustomer.id !== customer.id ? <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button> : '' }
                    { !isInDetails ? <Button variant="info" onClick={redirectToDetails}>Details</Button> : '' }
                </div>                
            </Card.Body>
        </Card>
    );
}
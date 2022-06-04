import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getLoggedCustomer } from '../../../utils/http-utils/customer-requests';
import { useNavigate } from 'react-router-dom';
import { RentalStatus } from '../../../utils/http-utils/rental-requests';

export function RentalCard({ rental, onRentalDelete, changeStatus }) {
    const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/rental/edit/${rental.id}`);
    }


    const renderNextStateButton = () => {
        if (rental.customerId !== loggedCustomer.fullName && loggedCustomer.role !== "admin") {
            return;
        }


        switch(rental.completion) {
            case RentalStatus.inProgress: 
                return <Button variant='danger' onClick={() => changeStatus(RentalStatus.Done, rental.id)}>Complete</Button>;

        }
    }

    const renderEditButton = () => {
        if(loggedCustomer.role === "admin" || loggedCustomer.fullName === rental.customerId) {
            return <Button variant="primary" onClick={navigateToEdit}>Edit</Button>;
        }
    }

    const renderDeleteButton = () => {
        if(loggedCustomer.role === "admin" || loggedCustomer.fullName === rental.customerId) {
            return <Button variant="danger" onClick={() => onRentalDelete(rental.id)}>Delete</Button>;
        }
    }


    const onDragHandler = (event) => {
        event.dataTransfer.setData("rentalId", rental.id);
    }
    

    return (
        <div className="rental-card-wrapper" draggable={true} onDrag={(event) => onDragHandler(event)}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{ rental.id }</Card.Title>
                    <Card.Text>
                        <span className='key'>Customer: </span>
                        <span className='value'>{rental.customerId}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Vehicle: </span>
                        <span className='value'>{rental.vehicleId}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Completion: </span>
                        <span className='value'>{rental.completion}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Start Date: </span>
                        <span className='value'>{rental.startDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Start Time: </span>
                        <span className='value'>{rental.startTime}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>End Date: </span>
                        <span className='value'>{rental.endDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>End Time: </span>
                        <span className='value'>{rental.endTime}</span>
                    </Card.Text>
                    <div className='btn-holder'>
                        { renderEditButton()  }
                        { renderDeleteButton()  }                             
                        { renderNextStateButton() }
                    </div>                
                </Card.Body>
            </Card>
        </div>
    );
}
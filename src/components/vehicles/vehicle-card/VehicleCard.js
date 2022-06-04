import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
//import { getLoggedCustomer } from '../../../utils/http-utils/customer-requests';
import './VehicleCard.scss';

export function VehicleCard({ vehicle, deleteVehicle, isInDetails }) {

    //const loggedCustomer = getLoggedCustomer();
    const navigate = useNavigate();
    const sendID = vehicle.id;
    
    const redirectToDetails = () => {
        navigate(`/vehicle/${vehicle.id}`);
    }

    const redirectToRent = () => {
        localStorage.setItem('selectedVehicle', sendID.toString());
        navigate(`/rental/create`);
    }

    const redirectToEdit = () => {
        navigate(`/vehicle/edit/${vehicle.id}`);
    }

    if (!vehicle) {
        return <p>No Vehicle!</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={vehicle.picture} />
            <Card.Body>
                <Card.Title>{ vehicle.brand }</Card.Title>
                <Card.Text>
                    <span className='key'>Type: </span>
                    <span className='value'>{vehicle.type}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Model: </span>
                    <span className='value'>{vehicle.model}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Construction Year: </span>
                    <span className='value'>{vehicle.constructionYear}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Fuel: </span>
                    <span className='value'>{vehicle.fuelType}</span>
                    <Card.Text>
                    <span className='key'>Seats: </span>
                    <span className='value'>{vehicle.numberOfSeats}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Price: </span>
                    <span className='value'>{vehicle.pricePerDay}</span>
                </Card.Text>
                </Card.Text>
                <div className='btn-holder'>
                    <Button variant="primary" onClick={redirectToEdit}>Edit</Button>
                    { <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button> }
                    <Button variant="primary" onClick={redirectToRent}>Rent</Button>
                   
                </div>                
            </Card.Body>
        </Card>
    );
}
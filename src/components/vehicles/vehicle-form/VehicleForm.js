import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { getVehicleById, saveVehicle } from '../../../utils/http-utils/vehicle-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function VehicleForm() {

    //const loggedCustomer = getLoggedCustomer();
    const params = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        type: 'economy',
        brand: '',
        model: '',
        constructionYear: '',
        fuelType: 'petrol',
        numberOfSeats: '',
        picture: '',
        pricePerDay: '',
        count: ''
    });

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then(response => {
                setVehicle(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            console.log('Success');
            navigate('/vehicles-list');
        });
    }

    const onInputChange = (event) => {   
       // setVehicle(prevState =>({
        //    ...prevState,
        //    [event.target.name]: event.target.value
        //}))     
        let value = event.target.value;
        if (event.target.name === 'isActive') {
            value = event.target.checked;
        }

        setVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    /*const getAdminControls = () => {
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
    }*/

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type</Form.Label>
                    <Form.Select value = {vehicle.type} onChange={setVehicle}>
                        <option value="economy">Economy</option>
                        <option value="estate">Estate</option>
                        <option value="luxury">Luxury</option>
                        <option value="suv">SUV</option>
                        <option value="cargo">Cargo</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" value={vehicle.brand} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter Model" name="model" value={vehicle.model} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ConstructionYear</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contruction Year" name="constructionYear" value={vehicle.constructionYear} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select value = {vehicle.fuelType} onChange={setVehicle}>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="electric">Electric</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control type="text" placeholder="Enter Number Of Seats" name="numberOfSeats" value={vehicle.numberOfSeats} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter a picture URL" name="picture" value={vehicle.picture} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price Per Day</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" name="pricePerDay" value={vehicle.pricePerDay} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="text" placeholder="Enter the amount of vehicles" name="count" value={vehicle.count} onChange={onInputChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
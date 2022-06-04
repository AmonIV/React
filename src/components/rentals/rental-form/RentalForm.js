import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { getRentalById, saveRental, RentalStatus } from "../../../utils/http-utils/rental-requests";
import { getLoggedCustomer} from '../../../utils/http-utils/customer-requests';
import './RentalForm.scss';

export function RentalForm() {
    const navigate = useNavigate();
    const params = useParams();
    const loggedCustomer = getLoggedCustomer();
    const [rental, setRental] = useState({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        completion: 'inProgress',
        vehicleId: localStorage.getItem('selectedVehicle'),
        customerId: loggedCustomer.fullName
    });

    useEffect(() => {
        if (params.id) {
            getRentalById(params.id).then((response) => {
                setRental(response.data);
            });
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setRental((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onRentalSubmit = (event) => {
        event.preventDefault();

        saveRental(rental).then(() => {
            navigate('/rentals-list');
        });
    }

    return (
        <div className="rental-form-wrapper">
            <Form onSubmit={onRentalSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start date" name="startDate" value={rental.startDate} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start time" name="startTime" value={rental.startTime} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter End date" name="endDate" value={rental.endDate} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="date" placeholder="Enter End time" name="endTime" value={rental.endTime} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Completion</Form.Label>
                    <Form.Select  onChange={onInputChange}>
                        <option value="inProgress">In Progress</option>
                        <option value="complete">Complete</option>
                    </Form.Select>
                </Form.Group>

               



                <Button variant="primary" type="submit">{rental.id ? 'Edit Rental' : 'Create Rental'}</Button>
            </Form>
        </div>
    );
}
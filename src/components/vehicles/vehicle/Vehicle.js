import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../../../utils/http-utils/-requests";
import { getAllRentalsForCustomer, deleteRental, saveRental } from "../../../utils/http-utils/rental-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import { RentalCard } from "../../rentals/rental-card/RentalCard";
import './Vehicle.scss';

export function Vehicle(props) {
    const params = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [vehicleRentals, setCustomerRentals] = useState();


    useEffect(() => {
        getCustomerById(params.id).then(response => setCustomer(response.data));
        getAllRentalsForCustomer(params.id).then(response => setCustomerRentals(response.data));
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteRental(id).then(() => {
            setCustomerRentals((prevState) => {
                return prevState.filter(rental => rental.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const rental = customerRentals.find(rental => rental.id === id);
        rental.status = status;
        saveRental(rental).then(() => {
            setCustomerRentals([...customerRentals]);
        });
    }

    return (
        <div className="customer">
            <CustomerCard customer={customer} isInDetails={true} />
            <div className="customer-rentals-holder">
                { customerRentals?.map(rental => <RentalCard  key={rental.id} rental={rental} onRentalDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) }
            </div>
        </div>
    )
}
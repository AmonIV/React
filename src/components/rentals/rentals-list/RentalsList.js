import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRental, getAllRentals, getAllRentalsForCustomer, saveRental, RentalStatus } from "../../../utils/http-utils/rental-requests";
import { RentalCard } from "../rental-card/RentalCard";

import './RentalsList.scss';

export function RentalsList() {
    const [rentals, setRentals] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllRentalsForCustomer(params.id).then(response => {
                setRentals(response.data);
            });
        }
        else {
            getAllRentals().then(response => {
                setRentals(response.data);
            });
        }
        
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteRental(id).then(() => {
            setRentals((prevState) => {
                return prevState.filter(rental => rental.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (completion, id) => {
        const rental = rentals.find(rental => rental.id === id);
        rental.completion = completion;
        saveRental(rental).then(() => {
            setRentals([...rentals]);
        });
    }

    const getRentalsWithCompletion = (completion) => {
        return rentals.filter(rental => rental.completion === completion).map(rental => <RentalCard key={rental.id} rental={rental} onRentalDelete={onDeleteHandler} changeCompletion={onChangeStatusHandler} />)
    }

    const onDropHandler = (event, status) => {
        event.preventDefault();

        const rentalId = event.dataTransfer.getData('rentalId');
        onChangeStatusHandler(status, rentalId);
    }

    return (
        <div className="rentals-list-wrapper">
            {}

            <div className="completion inProgress" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, RentalStatus.inProgress)}>
                <div className="column-header">In Progress</div>
                { getRentalsWithCompletion(RentalStatus.inProgress) }
            </div>
            <div className="completion complete" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, RentalStatus.complete)}>
                <div className="column-header">Complete</div>
                { getRentalsWithCompletion(RentalStatus.complete) }
            </div>
            
        </div>
    );
}
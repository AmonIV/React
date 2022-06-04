import axios from "axios";
import { getLoggedCustomer } from "./customer-requests";

export const RentalStatus = {
    inProgress: 'inProgress',
    complete: 'complete',
};

const apiUrl = 'http://localhost:3005/rentals';

export function getAllRentals() {
    return axios.get(apiUrl);
}

export function getAllRentalsForCustomer(customerId) {
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function getRentalById(rentalId) {
    return axios.get(`${apiUrl}/${rentalId}`);
}

export function saveRental(rental) {
    if (!rental.id) {
        const loggedCustomer = getLoggedCustomer();

        rental.customerId = loggedCustomer.fullName;
        rental.completion = RentalStatus.inProgress;
        rental.startDate = new Date().toDateString();
        rental.endDate = new Date(rental.endDate).toDateString();
        return axios.post(apiUrl, rental);
    }

    rental.startDate = new Date(rental.startDate).toDateString();
    rental.endDate = new Date(rental.endDate).toDateString();
    return axios.put(`${apiUrl}/${rental.id}`, rental);
}

export function deleteRental(id) {
    return axios.delete(`${apiUrl}/${id}`);
}
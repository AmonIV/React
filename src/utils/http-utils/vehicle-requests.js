import axios from 'axios';

const apiUrl = 'http://localhost:3005/vehicles';
//const loggedCustomerKey = 'loggedCustomer';

/*export function getLoggedCustomer() {
    return JSON.parse(localStorage.getItem(loggedCustomerKey));
}

export async function logout() {
    localStorage.removeItem(loggedCustomerKey);
}*/

export function getAllVehicles() {
    return axios.get(apiUrl);
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveVehicle(vehicle) {
    if (!vehicle.picture)
        vehicle.picture = `https://picsum.photos/200/300?random=${Math.random()}`;

    if (vehicle.id) {
        return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }

    return axios.post(`${apiUrl}`, vehicle);
}

/*export async function registerCustomer(customer) {
    const existingCustomers = (await axios.get(`${apiUrl}?email=${customer.email}`)).data;

    if (existingCustomers.length > 0) {
        throw new Error('Customer with this email already exists.');
    }

    return saveCustomer(customer);
}

export async function login(customer) {
    const allCustomers = (await getAllCustomers()).data;

    const foundCustomer = allCustomers.find(c => c.email === customer.email && c.password === customer.password);

    if (!foundCustomer)
        throw new Error('Invalid email/password');

    if (!foundCustomer.isActive)
        throw new Error('Customer is blocked');

    localStorage.setItem(loggedCustomerKey, JSON.stringify(foundCustomer));

    return foundCustomer;
}*/
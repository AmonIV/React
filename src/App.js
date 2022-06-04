import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { RentalsList } from './components/rentals/rentals-list/RentalsList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { CustomerForm } from './components/customers/customer-form/CustomerForm';
import { Customer } from './components/customers/customer/Customer';
import { CustomersList } from './components/customers/customers-list/CustomersList';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard> <Register /> </NonAuthenticatedGuard>} />
        <Route exact path="/login" element={<NonAuthenticatedGuard> <Login /> </NonAuthenticatedGuard>} />
        <Route exact path="/" element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
              <Route path="/customers-list" element={<CustomersList />} />
              <Route path="/customer/:id" element={<Customer />} />
              <Route path="/customer/create" element={<CustomerForm />} />
              <Route path="/customer/edit/:id" element={<CustomerForm />} />

              <Route path="/rentals-list" element={<RentalsList />} />
              <Route path="/rentals/:id" element={<RentalsList />} />
              <Route path="/rental/create" element={<RentalForm /> } />
              <Route path="/rental/edit/:id" element={<RentalForm />} />

              <Route path="/vehicles-list" element={<VehiclesList />} />
              <Route path="/vehicles/:id" element={<VehiclesList />} />
              <Route path="/vehicle/create" element={<VehicleForm /> } />
              <Route path="/vehicle/edit/:id" element={<VehicleForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

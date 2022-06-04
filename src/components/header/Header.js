import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedCustomer, logout } from '../../utils/http-utils/customer-requests';

export function Header() {
    const loggedCustomer = getLoggedCustomer();
    const rentalUrl = `/rentals/${loggedCustomer.id}`;
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Rental Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/customers-list">Customers List</Link>
                        <Link className='nav-link' to="/customer/create">Create Customer</Link>
                        <Link className='nav-link' to="/rentals-list">All Rentals</Link>
                        <Link className='nav-link' to={rentalUrl}>My Rentals</Link>
                        <Link className='nav-link' to="/rental/create">Create rental</Link>
                        <Link className='nav-link' to="/vehicles-list">Vehicles List</Link>
                        <Link className='nav-link' to="/vehicle/create">Create Vehicle</Link>
                        
                    </Nav>
                    <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser, logout } from '../../utils/http-utils/user-requests';

export function Header() {
    const loggedUser = getLoggedUser();
    const taskUrl = `/tasks/${loggedUser.id}`;
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
                    <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/users-list">Users List</Link>
                        <Link className='nav-link' to="/user/create">Create User</Link>
                        <Link className='nav-link' to="/tasks-list">All Tasks</Link>
                        <Link className='nav-link' to={taskUrl}>My Tasks</Link>
                        <Link className='nav-link' to="/task/create">Create task</Link>
                        
                    </Nav>
                    <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
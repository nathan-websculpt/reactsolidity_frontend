import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => (
<Navbar collapseOnSelect expand='sm' bg='primary' variant='dark'>
    <Container>
        <Navbar.Brand>React + Solidity Examples</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/about' className='nav-link'>About</Link>
                <Link to='/build-notes' className='nav-link'>Build Notes</Link>
                <Link to='/coin-flip' className='nav-link'>Coin Flip</Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default Navigation
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => (
<Navbar collapseOnSelect fixed='top' expamd='sm' bg='primary' variant='dark'>
    <Container>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Brand href='#home'>React + Solidity Examples</Navbar.Brand>
        <Navbar.Collapse id='responsive-navbar'>
            <Nav className='me-auto'>
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
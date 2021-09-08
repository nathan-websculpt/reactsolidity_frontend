import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => (
<Navbar collapseOnSelect fixed='top' expand='sm' bg='primary' variant='dark'>
        <Navbar.Brand href='#home'>React + Solidity Examples</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/about' className='nav-link'>About</Link>
                <Link to='/build-notes' className='nav-link'>Build Notes</Link>
                <Link to='/coin-flip' className='nav-link'>Coin Flip</Link>
                <Link to='/coin-flip' className='nav-link'>Coin Flip</Link>
                <Link to='/coin-flip' className='nav-link'>Coin Flip</Link>
            </Nav>
        </Navbar.Collapse>
  </Navbar>
);
export default Navigation
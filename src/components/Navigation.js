import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => (
<Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#home">React + Solidity Examples</Navbar.Brand>
    <Nav className="me-auto">
      <Link to='/' className="nav-link">Home</Link>
      <Link to='/about' className="nav-link">About</Link>
      <Link to='/build-notes' className="nav-link">Build Notes</Link>
      <Link to='/coin-flip' className="nav-link">Coin Flip</Link>
    </Nav>
    </Container>
  </Navbar>
);
export default Navigation
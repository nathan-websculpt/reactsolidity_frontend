import logo from '../logo.svg';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col className='text-center'>
                    <h1>
                        Home
                    </h1>
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <Image src={logo} className="App-logo" alt="logo" fluid />
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <h2>
                        React examples ...
                    </h2>
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <h3>
                        with Solidity and Blockchain examples to come
                    </h3>
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <a 
                    href='https://github.com/nathan-websculpt/reactsolidity_frontend'
                    target='_blank'>
                        View the GitHub
                    </a>
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <a 
                    href='https://twitter.com/sculpt_web'
                    target='_blank'>
                        View the Twitter
                    </a>
                </Col>
            </Row> 
            <Row>
                <Col className='text-center'>
                    <a 
                    href='https://medium.com/@websculpt'
                    target='_blank'>
                        View the Blog
                    </a>
                </Col>
            </Row> 
        </Container>
    )
}

export default Home

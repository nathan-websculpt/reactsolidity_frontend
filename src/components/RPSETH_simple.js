import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Injected } from './wallet/Connectors';
import { useWeb3React } from '@web3-react/core';

export default function RPSETH_simple() {

    // active:      Is there a wallet connected?
    // account:     Address 
    // library:     Web3 (or, ethers if that's what you used)
    // connector:   'Injected' connector
    // activate:    Method to connect to wallet
    // deactivate:  Method to disconnect from wallet
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    async function connectToMetaMask() {
        try {
            await activate(Injected); //calls the activate method provided by useWeb3React()
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnectMetaMask() {
        try {
            await deactivate(); //calls the deactivate method provided by useWeb3React()
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
            <Container>
                <Row className='mt-5'>
                    <Col className='text-center'>
                        {active ? <span>Connected Account: <b>{account}</b></span> : <span>Not Connected</span>} 
                    </Col>    
                </Row>   
                <Row className='mt-5'>
                    <Col className='text-center'>
                        <Button 
                            onClick={connectToMetaMask}>
                                Connect to MetaMask
                        </Button>
                    </Col>    
                </Row> 
                <Row className='mt-5'>
                    <Col className='text-center'>
                        <Button
                            onClick={disconnectMetaMask}>
                                Disconnect
                        </Button>
                    </Col>    
                </Row> 



                
                <Row className='mt-5'>
                    <Col className='text-center'>
                        
                    </Col>    
                </Row> 
            </Container>
    )
}

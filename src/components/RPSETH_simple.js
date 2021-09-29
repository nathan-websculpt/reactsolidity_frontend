import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import { Injected } from './wallet/Connectors';
import { useWeb3React } from '@web3-react/core';
import '../abi.js';

//not usable on mainnet, as the front-end values can be manipulated prior to calling the smart contract
export default function RPSETH_simple() {

    // active:      Is there a wallet connected?
    // account:     Address 
    // library:     Web3 (or, ethers if that's what you used)
    // connector:   'Injected' connector
    // activate:    Method to connect to wallet
    // deactivate:  Method to disconnect from wallet
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    //instance of the Smart Contract
    const [contractInstance, setContractInstance] = useState(null);

    //text-boxes
    const [etherAmount, setEtherAmount] = useState('');
    const [sender, setSender] = useState('');
    const [playerBalance, setPlayerBalance] = useState('');
    const [contractBalance, setContractBalance] = useState('');

    //RPS values
    const [playerOneChoice, setPlayerOneChoice] = useState(null); //What you select
    const [playerTwoChoice, setPlayerTwoChoice] = useState(null); //What the Computer selects
    const [gameOutcome, setGameOutcome] = useState(null); //Win, Lose, or Draw
    const choiceArray = ['rock', 'paper', 'scissors']; //Array will later map to three buttons   

    //init the Smart Contract Instance - when library is available
    useEffect(() => {
        //library gives access to web3
        if(library != null) {
            initContractInstance();
            console.log('useEffect() initialized the contract instance');
        } else {
            console.log('library is null...');
        }
    }, [library]);
    
    async function initContractInstance() {        
        var ci = new library.eth.Contract( window.rpsv1_abi , '0xCf945Bee50d91f38E01912231Aba13A0bD7505A9');
        setContractInstance(ci);
    }

    async function connectToMetaMask() {
        try {
            activate(Injected); //calls the activate method provided by useWeb3React()
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


    //view data for testing
    async function getMsgSender() {  
        await contractInstance.methods.getMsgSender().call({ from: account }).then(function(msgsender) {
            setSender(msgsender);
        }).catch(err => console.log(err));
    }
    async function getPlayerBalance(){
        await contractInstance.methods.getPlayerBalance(account).call().then(function(playerBalance) {
            var pb = library.utils.fromWei(library.utils.toBN(playerBalance), 'ether');
            setPlayerBalance(pb);
        }).catch(err => console.log(err));
    }
    async function getContractBalance() {
        await contractInstance.methods.getContractBalance().call().then(function(contractBalance) {
            var cb = library.utils.fromWei(library.utils.toBN(contractBalance), 'ether');
            setContractBalance(cb);
        }).catch(err => console.log(err));        
    }
    //END: view data for testing


    //Ether deposits && withdrawals
    async function fund() {
        var etherBalance = library.utils.toWei(library.utils.toBN(etherAmount), 'ether');
        console.log('num converted to ether: ', etherBalance);

        await contractInstance.methods.fundContract().send({ from: account, value: etherBalance }).then(function(receipt){
            console.log('receipt from fund: ' + receipt);
        }).catch(err => console.log(err));
    } 
    async function deposit() {
        var etherBalance = library.utils.toWei(library.utils.toBN(etherAmount), 'ether');
        console.log('num converted to ether: ', etherBalance);

        await contractInstance.methods.deposit().send({ from: account, value: etherBalance}).then(function(receipt){
            console.log('receipt from deposit: ' + receipt);
        }).catch(err => console.log(err));
    } 
    async function withdraw() {
        await contractInstance.methods.withdraw().send({ from: account }).then(function(receipt){
            console.log('receipt from withdraw: ' + receipt);
        }).catch(err => console.log(err));
    }
    //END: Ether deposits && withdrawals


    //Rock, Paper, Scissors - Play Game
    async function testPlayRPS() {
        if(library === undefined) {
            alert('Please connect to metamask...');
        }
        else {
            //tests winning one ether
            await contractInstance.methods.playGame('paper', 'rock', 1).send({ from: account }).then(function(receipt){
                console.log('receipt from playGame: ' + receipt);
            }).catch(err => console.log(err));                
        }
    }
    async function playRPS(choiceSelected) {
        if(library === undefined) {
            alert('Please connect to metamask...');
        }
        else {
            const generatedChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]; //random choice
            await contractInstance.methods.playGame(choiceSelected, generatedChoice, 1).send({ from: account }).then(function(receipt){
                let rpsOutCome = receipt.events.GetGameOutcome.returnValues[0]; // read the event fired by the contract
                switch (rpsOutCome) {
                    case '0':
                      setGameOutcome('IT IS A DRAW!')
                      break
                    case '1':
                      setGameOutcome('YOU WIN!')
                      break
                    case '2':
                      setGameOutcome('YOU LOSE!')
                      break
                    case '3':
                        setGameOutcome('...there was a problem with this game')
                        break
                }
                setPlayerOneChoice(choiceSelected);
                setPlayerTwoChoice(generatedChoice);
            }).catch(err => console.log(err));

        }
    }
    //END: Rock, Paper, Scissors - Play Game

    return (
        <Container>
            <Row className='mt-5'>
                <Col className='text-center'>
                    <h1>Uses RPSv1 Smart Contract</h1>
                    <h3>start by connecting a test wallet</h3>
                    <h4>fund the contract and deposit as a player</h4>
                </Col>    
            </Row> 
            <Row className='mt-5'>
                <Col md={{ span: 4, offset: 2 }}>
                    <InputGroup>
                        <Button variant='primary' onClick={ connectToMetaMask }>Connect to MetaMask</Button>
                        <Button variant='outline-primary' onClick={ disconnectMetaMask }>Disconnect</Button>
                    </InputGroup>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <InputGroup>
                        <FormControl
                            placeholder='Amount in Ether'
                            type='number' value={ etherAmount } 
                            onChange={ (event) => 
                                setEtherAmount(event.target.value) }/>
                        <Button variant='primary' onClick={ fund }>Fund</Button>
                        <Button variant='outline-primary' onClick={ deposit }>Deposit</Button>
                    </InputGroup>
                </Col>  
            </Row>                  
            <Row className='mt-3 mb-5'>
                <Col className='text-center'>
                    {active ? <span>Connected Account: <b>{ account }</b></span> : <span>Not Connected</span>} 
                </Col>    
            </Row>  
            <hr />    
            <Row className='mt-3'>  
                <Col className='text-center'>
                    <h5>Test Contract Interaction</h5>
                </Col>
            </Row>
            <Row className='mt-3 mb-5'>                    
                <Col md={{ span: 3, offset: 2 }}>
                    <InputGroup>
                        <FormControl
                            placeholder='...Msg.Sender'
                            type='text' value={ sender } 
                            onChange={ (event) => 
                                setSender(event.target.value) }/>
                        <Button variant='dark' onClick={ getMsgSender }>Msg.Sender</Button>
                    </InputGroup>
                    
                    <InputGroup className='mt-1'>
                        <FormControl
                            placeholder='...player balance'
                            type='text' value={ playerBalance } 
                            onChange={ (event) => 
                                setPlayerBalance(event.target.value) }/>
                        <Button variant='dark' onClick={ getPlayerBalance }>Player Balance</Button>
                    </InputGroup>
                    
                    <InputGroup className='mt-1'>
                        <FormControl
                            placeholder='...contract balance'
                            type='text' value={ contractBalance } 
                            onChange={ (event) => 
                                setContractBalance(event.target.value) }/>
                        <Button variant='dark' onClick={ getContractBalance }>Contract Balance</Button>
                    </InputGroup>
                </Col>  
                <Col>
                    <Row>
                        <Col className='text-center'>
                            <Button variant='dark'
                                onClick={ testPlayRPS }>
                                    test play
                            </Button>
                        </Col>    
                    </Row> 
                    <Row className='mt-5'>
                        <Col className='text-center'>
                            <Button variant='warning'
                                onClick={ withdraw }>
                                    withdraw
                            </Button>
                        </Col>    
                    </Row> 
                </Col>
            </Row> 
            <hr />                    
            <Row className='mt-5'>
                <Col className='text-center'>
                    <h1>
                        Rock, Paper, Scissors
                    </h1>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col className='text-center'>
                    <h4>
                        Make your selection
                    </h4>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col className='text-center'>
                    {
                    choiceArray.map((choice, i) =>
                    <Button style={{marginRight: '15px'}} key={i} onClick={() => playRPS(choice)}>
                        { choice }
                    </Button>
                    )}
                </Col>
            </Row>           
            <Row className='mt-4'>
                <Col className='text-center'>
                    <h1><b>
                        { gameOutcome }
                    </b></h1>
                </Col>
            </Row>
            <Row className='mt-2 mb-5'>
                <Col md={{ span: 4, offset: 2 }} className='text-center'>
                    <h4>You Played: <b>{ playerOneChoice }</b></h4>
                </Col>
                <Col md={4} className='text-center'>
                    <h4>Computer Played: <b>{ playerTwoChoice }</b></h4>
                </Col>
            </Row> 
        </Container>
    )
}

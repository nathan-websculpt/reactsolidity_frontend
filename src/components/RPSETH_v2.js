import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import { Injected } from './wallet/Connectors';
import { useWeb3React } from '@web3-react/core';
import '../abi.js';

//used in this blog post: 
//https://medium.com/@websculpt/rock-paper-scissors-in-solidity-part-3-commit-reveal-4d56a84cbe97
export default function RPSETH_v2() {

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

    //player values
    const [playerOneOpponentAddress, setPlayerOneOpponentAddress] = useState('0x496...');
    const [playerTwoOpponentAddress, setPlayerTwoOpponentAddress] = useState('');
    const [playerOneSalt, setPlayerOneSalt] = useState('');
    const [playerTwoSalt, setPlayerTwoSalt] = useState('');

    //RPS values
    const [playerOneChoice, setPlayerOneChoice] = useState(null); //What player one selects
    const [playerTwoChoice, setPlayerTwoChoice] = useState(null); //What player two selects
    const [gameOutcome, setGameOutcome] = useState(null); //Win, Lose, or Draw
    const choiceArray = ['rock', 'paper', 'scissors']; //Array will map to three buttons   

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
        var ci = new library.eth.Contract( window.rpsv2_abi , '0xa5...');
        setContractInstance(ci);
        console.log("init contract instance...");
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
            let pb = library.utils.fromWei(library.utils.toBN(playerBalance), 'ether');
            setPlayerBalance(pb);
        }).catch(err => console.log(err));
    }
    async function getContractBalance() {
        await contractInstance.methods.getContractBalance().call().then(function(contractBalance) {
            let cb = library.utils.fromWei(library.utils.toBN(contractBalance), 'ether');
            setContractBalance(cb);
        }).catch(err => console.log(err));        
    }
    //END: view data for testing


    //Ether deposits && withdrawals
    async function deposit() {
        let etherBalance = library.utils.toWei(library.utils.toBN(etherAmount), 'ether');

        await contractInstance.methods.deposit().send({ from: account, value: etherBalance}).then(function(receipt){
            console.log('receipt from deposit _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
        }).catch(err => console.log(err));
    } 
    async function withdraw() {
        await contractInstance.methods.withdraw().send({ from: account }).then(function(receipt){
            console.log('receipt from withdraw _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
        }).catch(err => console.log(err));
    }
    //END: Ether deposits && withdrawals


    //Rock, Paper, Scissors - Play Game
    async function startGame(choiceSelected) {
        if(library === undefined) {
            alert('Please connect to metamask...');
        }
        else {
            let gameChoice = choiceArray.indexOf(choiceSelected) + 1;
            setPlayerOneChoice(gameChoice);

            let salt =  library.utils.sha3("" + Math.random());
            let encoded = library.eth.abi.encodeParameters(['uint256', 'bytes32'],[gameChoice, salt]);
            let hash = library.utils.sha3(encoded, {encoding: 'hex'});
            setPlayerOneSalt(salt);

            console.log('Player one salt: ', salt);
            console.log('Player one hash: ', hash);

            setPlayerTwoOpponentAddress(account);

            if (hash !== undefined && hash !== null) {
                var bet = library.utils.toWei(library.utils.toBN('1'), 'ether');
                
                await contractInstance.methods.startGame(hash, playerOneOpponentAddress, bet).send({ from: account }).then(function(receipt){
                    console.log('receipt from startGame _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
                }).catch(err => console.log(err)); 
            }             
        }
    }
    async function participateGame(choiceSelected) {
        if(library === undefined) {
            alert('Please connect to metamask...');
        }
        else {
            let gameChoice = choiceArray.indexOf(choiceSelected) + 1;
            setPlayerTwoChoice(gameChoice);

            let salt =  library.utils.sha3("" + Math.random());
            let encoded = library.eth.abi.encodeParameters(['uint256', 'bytes32'],[gameChoice, salt]);
            let hash = library.utils.sha3(encoded, {encoding: 'hex'});
            setPlayerTwoSalt(salt);

            console.log('Player two salt: ', salt);
            console.log('Player two hash: ', hash);

            await contractInstance.methods.participateGame(hash, playerTwoOpponentAddress).send({ from: account }).then(function(receipt){
                console.log('receipt from participateGame _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
            }).catch(err => console.log(err)); 
        }
    }
    //END: Rock, Paper, Scissors - Play Game

    async function revealGamePlayerOne() {
        await contractInstance.methods.revealChoice(playerOneChoice, playerOneSalt, playerTwoOpponentAddress).send({ from: account }).then(function(receipt){
            console.log('receipt from revealGamePlayerOne _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
        }).catch(err => console.log(err)); 
    }
    async function revealGamePlayerTwo() {
        await contractInstance.methods.revealChoice(playerTwoChoice, playerTwoSalt, playerTwoOpponentAddress).send({ from: account }).then(function(receipt){
            console.log('receipt from revealGamePlayerTwo _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
        }).catch(err => console.log(err)); 
    }
    async function endGame() {
        await contractInstance.methods.endGame(playerTwoOpponentAddress).send({ from: account }).then(function(receipt){
            console.log('receipt from endGame _> status: ' + receipt.status + ', gas: ' + receipt.gasUsed);
            let rpsOutCome = receipt.events.GetGameOutcome.returnValues[0]; // read the event fired by the contract

            if(rpsOutCome == 0) {
                setGameOutcome('It is a draw');
            } else if(rpsOutCome == 1) {
                setGameOutcome('Player One Wins');
            } else if(rpsOutCome == 2) {
                setGameOutcome('Player Two Wins');
            } else {
                setGameOutcome('Problem with game');
            }

            console.log('outcome from contract: ', rpsOutCome);
        }).catch(err => console.log(err)); 
    }
    async function viewGame() {
        let gameData = await contractInstance.methods.games(playerTwoOpponentAddress).call();
        console.log('Result from View Game: ', gameData);
    }

    return (
        <Container>
            <Row className='mt-5'>
                <Col className='text-center'>
                    <h1>Uses RPSv2 Smart Contract</h1>
                    <h3>start by connecting a test wallet</h3>
                    <h4>deposit as a player, and start playing</h4>
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
                        <Button variant='primary' onClick={ deposit }>Deposit</Button>
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

            <Row className='mt-1'>
                <Col className='text-center'>
                    <Row className='mt-2'>
                    <Col className='text-center'>
                        <h4>
                            PLAYER ONE
                        </h4>
                        <br />
                        <h6>Opponent</h6>
                        <FormControl
                            placeholder='Opponent Address'
                            type='text' value={ playerOneOpponentAddress } 
                            onChange={ (event) => 
                                setPlayerOneOpponentAddress(event.target.value) }/>
                    </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='text-center'>
                            {
                            choiceArray.map((choice, i) =>
                            <Button style={{marginRight: '15px'}} key={i} onClick={() => startGame(choice)}>
                                { choice }
                            </Button>
                            )}
                        </Col>
                    </Row>   
                </Col>
                
                <Col className='text-center'>
                    <Row className='mt-2'>
                    <Col className='text-center'>
                        <h4>
                            PLAYER TWO
                        </h4>
                        <br />
                        <h6>Opponent</h6>
                        <FormControl
                            placeholder='Opponent Address'
                            type='text' value={ playerTwoOpponentAddress } 
                            onChange={ (event) => 
                                setPlayerTwoOpponentAddress(event.target.value) }/>
                    </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='text-center'>
                            {
                            choiceArray.map((choice, i) =>
                            <Button style={{marginRight: '15px'}} key={i} onClick={() => participateGame(choice)}>
                                { choice }
                            </Button>
                            )}
                        </Col>
                    </Row>   
                </Col>
            </Row>

            <Row className='mt-5 mb-5'>
                <Col className='text-center'>
                    <h1><b>
                        { gameOutcome }
                    </b></h1>
                </Col>
            </Row>
            <Row className='mt-2 mb-5'>
                <Col md={{ span: 4, offset: 2 }} className='text-center'>
                    <h4>Player One Played: <b>{ playerOneChoice }</b></h4>
                    <br />
                    <Button variant='dark' onClick={ revealGamePlayerOne }>Player One Reveal</Button>
                </Col>
                <Col md={4} className='text-center'>
                    <h4>Player Two Played: <b>{ playerTwoChoice }</b></h4>
                    <br />
                    <Button variant='dark' onClick={ revealGamePlayerTwo }>Player Two Reveal</Button>
                </Col>
            </Row> 
            <Row className='mt-2 mb-5'>
                <Col md={{ span: 1, offset: 5 }} className='text-center'>
                    <Button variant='dark' onClick={ endGame }>End Game</Button>
                </Col>
                <Col md={1} className='text-center'>
                    <Button variant='dark' onClick={ viewGame }>View Game</Button>
                </Col>
            </Row> 

        </Container>
    )
}

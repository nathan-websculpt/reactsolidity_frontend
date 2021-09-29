import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

//Simple Rock, Paper, Scissors game that uses string concat to determine a winner
//Perfect example to see how React works in a simple Component
const RPS = () => {
    const [playerOneChoice, setPlayerOneChoice] = useState(null); //What you select
    const [playerTwoChoice, setPlayerTwoChoice] = useState(null); //What the Computer selects
    const [gameOutcome, setGameOutcome] = useState(null); //Win, Lose, or Draw
    const choiceArray = ['rock', 'paper', 'scissors']; //Array will later map to three buttons

    //playGame fires when you click one of the three buttons
    const playGame = (choiceSelected) => {
        setPlayerOneChoice(choiceSelected);
        generatePlayerTwoChoice();
    }

    //playGame calls this to get a random choice and set it to Player Two's choice (the Computer)
    const generatePlayerTwoChoice = () => {
        const generatedChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]; //random choice
        setPlayerTwoChoice(generatedChoice); //sets the Computer's choice
    }

    //useEffect() tells React that we are doing something after render
    useEffect(() => {
          switch (playerOneChoice + playerTwoChoice) {
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
              setGameOutcome('IT IS A DRAW!')
              break
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
              setGameOutcome('YOU WIN!')
              break
            case 'paperscissors':
            case 'scissorsrock':
            case 'rockpaper':
              setGameOutcome('YOU LOSE!')
              break
        }
      }, [playerTwoChoice, playerOneChoice]) // Only re-runs this effect if values change

    //following bootstrap is a little over-kill, but it shows how to work with rows && cols
    return (
        <Container>
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
                    <Button style={{marginRight: '15px'}} key={i} onClick={() => playGame(choice)}>
                        {choice}
                    </Button>
                    )}
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col md={{ span: 4, offset: 2 }} className='text-center'>
                    <h4>You Played: <b>{playerOneChoice}</b></h4>
                </Col>
                <Col md={4} className='text-center'>
                    <h4>Computer Played: <b>{playerTwoChoice}</b></h4>
                </Col>
            </Row>            
            <Row className='mt-5'>
                <Col className='text-center'>
                    <h3>
                        {gameOutcome}
                    </h3>
                </Col>
            </Row>
        </Container>
    )
}

export default RPS

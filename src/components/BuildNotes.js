import { Container } from 'react-bootstrap';

const BuildNotes = () => {
    return (
        <Container>
            <h1 className='build-note-title mt-5'>Build Notes</h1>
            <hr />
            <h4 className='build-note-section-title'>Round 1</h4>
            <ul>
                <li>
                    <p className='build-note-item'>
                        NOTE: Already had node.js installed - you need to be able to run <i>npm</i> and <i>npx</i> commands
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        RAN: <i>npx create-react-app reactsolidity_frontend</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        <i>cd reactsolidity_frontend</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Install the React Router: <i>npm install react-router-dom</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Install web3 (what we will use later to talk to MetaMask/Blockchain): <i>npm install web3</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Install bootstrap (for all the time-saving css): <i>npm install react-bootstrap bootstrap</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Start dev server/env: <i>npm start</i>
                    </p>
                </li>
                <li>                    
                    <p className='build-note-item'>
                        Build (adds a build folder, necessary for deploying): <i>npm run build</i>
                    </p>
                </li>                
            </ul>

            
            <h4 className='build-note-section-title'>Round 2</h4>
            <ul>
                <li>
                    <p className='build-note-item'>
                        NOTE: Deployed, but Netlify was treating common warnings as errors which I learned after making first update
                        <br />
                        You need to go to your Deploy Settings and change your build command so that CI is set to false ... Here is the fix: <i>CI=false npm run build</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Added Components: 
                        <ul>
                            <li><i>Navigation</i></li>
                            <li><i>Home</i></li>
                            <li><i>About</i></li>
                            <li><i>BuildNotes</i></li>
                            <li><i>CoinFlip</i></li>
                        </ul>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Set up Router in App.js
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        ...more notes on the router, switch, and nav later...
                    </p>
                </li>
            </ul>
        </Container>
    )
}

export default BuildNotes

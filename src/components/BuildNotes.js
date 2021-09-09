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
                    </p> 
                    <ul>
                        <li><i>Navigation</i></li>
                        <li><i>Home</i></li>
                        <li><i>About</i></li>
                        <li><i>BuildNotes</i></li>
                        <li><i>CoinFlip</i></li>
                    </ul>
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

            <h4 className='build-note-section-title'>Round 3</h4>
            <ul>
                <li>
                    <p className='build-note-item'>
                        NOTE: to display bootstrap in HTML vs. React Bootstrap, you can view these commits
                    </p>
                    <ul>
                        <li>
                            Bootstrap you have already seen in HTML: <a href='https://github.com/nathan-websculpt/reactsolidity_frontend/commit/a41283a15175401dc8e760114fca402d02028b93' target='_blank'>Start at this commit</a>
                        </li>
                        <li>
                            Swapped to React Bootstrap: <a href='https://github.com/nathan-websculpt/reactsolidity_frontend/commit/cf5b3af32e471f620147581d77fa245805916257' target='_blank'>End with this commit</a>
                        </li>
                    </ul>
                </li>
                <li>
                    Note: it is at this point I was making some design decisions and package choices for how I will later display code snippets (for the tutorial aspects of this site)
                </li>
            </ul>
            
            <h4 className='build-note-section-title'>Rock, Paper, Scissors game added</h4>
            <ul>
                <li>
                    <p className='build-note-item'>
                        A simple game that uses an array of choices and determines win/lose/draw by string concatenation 
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        A variation of this logic will be the first iteration of the Solidity/Ethereum game
                    </p>
                </li>
            </ul>
            
            <h4 className='build-note-section-title'>Rock, Paper, Scissors Ethereum Game (starting)</h4>
            <ul>
                <li>
                    <p className='build-note-item'>
                        NOTE: starting with the basics like the Web3 Provider and a MetaMask login
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Going to be using <a href='https://github.com/NoahZinsmeister/web3-react' target='_blank'>web3-react</a> 
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Installed: <i>npm i @web3-react/core</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Installed: <i>npm i @web3-react/injected-connector</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        Added the InjectedConnector for MetaMask to a Component - <i>'/wallet/Connectors.js'</i>
                    </p>
                </li>
                <li>
                    <p className='build-note-item'>
                        <b>App.js changes</b>
                    </p>
                    <ul>
                        <li>
                            <p className='build-note-item'>
                                <i>added Web3ReactProvider - '@web3-react/core'</i>
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                <i>added Web3 - 'web3'</i>
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                created <i>getLibrary function</i> which will return a new <i>Web3</i> object (using the provider)
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                wrapped whole app in <i>Web3ReactProvider</i> 
                            </p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p className='build-note-item'>
                        <b>RPSETH_simple component created</b> (a simple start to Rock, Paper, Scissors on Ethereum)
                    </p>
                    <ul>
                        <li>
                            <p className='build-note-item'>
                                <i>added <i>Injected</i> (the InjectedConnector from before) - './wallet/Connectors'</i>
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                <i>added useWeb3React - '@web3-react/core'</i>
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                used <i>useWeb3React function</i> to get account/address information (as well as activate/deactivate functions)
                            </p>
                        </li>
                        <li>
                            <p className='build-note-item'>
                                Simple buttons to connect and disconnect a MetaMask button added
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </Container>
    )
}

export default BuildNotes

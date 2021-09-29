import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import BuildNotes from './components/BuildNotes';
//import CoinFlip from './components/CoinFlip';
import RPS from './components/RPS';
import MetaMaskExample from './components/MetaMaskExample';
import RPSETH_simple from './components/RPSETH_simple';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

//returns a new Web3 object, with provider
function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    //wrapping everything with the provider
    //gives access to all the good stuff for talking to blockchain
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div>
          <Navigation />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/about'>
                <About />
              </Route>
              <Route exact path='/build-notes'>
                <BuildNotes />
              </Route>
              {/* <Route exact path='/coin-flip'>
                <CoinFlip />
              </Route> */}
              <Route exact path='/rock-paper-scissors'>
                <RPS />
              </Route>
              <Route exact path='/metamask-example'>
                <MetaMaskExample />
              </Route>
              {/* <Route exact path='/rps-ethereum-simple'>
                <RPSETH_simple />
              </Route> */}
            </Switch>
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;

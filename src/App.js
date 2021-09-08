//import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import BuildNotes from './components/BuildNotes';
import CoinFlip from './components/CoinFlip';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  //<img src={logo} className="App-logo" alt="logo" />

  
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <div className='container'>
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
            <Route exact path='/coin-flip'>
              <CoinFlip />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

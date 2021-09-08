import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import BuildNotes from './components/BuildNotes';
import CoinFlip from './components/CoinFlip';
import RPS from './components/RPS';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
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
            <Route exact path='/coin-flip'>
              <CoinFlip />
            </Route>
            <Route exact path='/rock-paper-scissors'>
              <RPS />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";

import "./styles.css";

import Header from './assets/Header.js';
import { Lander, Information, Contact } from './assets/Homepage.js';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="line rose-bg"></div>
      <Lander />
      <Information />
      <Contact />
    </BrowserRouter>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> 7fcfdaf (first commit)
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";

import "./styles.css";

import Header from './assets/Header.js';
import Landing from './assets/Main.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="line rose-bg"></div>
      <Landing />
    </BrowserRouter>
  );
}

export default App;

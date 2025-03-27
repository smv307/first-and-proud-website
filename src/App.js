import { BrowserRouter } from "react-router-dom";

import "./styles.css";

import Header from './assets/Header.js';
import { Lander, Information } from './assets/Homepage.js';


function App() {
  return (
    <BrowserRouter>s
      <Header />
      <div className="line rose-bg"></div>
      <Lander />
    </BrowserRouter>
  );
}

export default App;

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
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";

import "./styles.css";

import Header from './assets/Header.js';
import CollegeGrid from './assets/CollegeData.js';
import { Lander, Information, Contact } from './assets/Homepage.js';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="line rose-bg"></div>
      <Lander />
      <Information />
      <Contact />
      <CollegeGrid zipCode="94602" maxCost={20000}/>
    </BrowserRouter>
  );
}

export default App;

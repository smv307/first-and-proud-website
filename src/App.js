import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles.css";

import Header from './assets/Header.js';
import CollegeMatch from './assets/CollegeMatch.js';
import Homepage from './assets/Homepage.js';

function App() {
  return (
    <Router>
      <Header />
      <div className="line rose-bg"></div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/college-match" element={<CollegeMatch />} />
      </Routes>
    </Router>
  );
}

export default App;

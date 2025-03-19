import { BrowserRouter } from "react-router-dom";
import Header from './assets/Header.js';
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;

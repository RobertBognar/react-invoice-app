import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Invoice from "./Components/Invoice/Invoice";

import { GlobalStorage } from './Context/GlobalMode';

function App() {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="invoice/:id" element={<Invoice />} />
          </Routes>
        </main>
      </GlobalStorage>
    </BrowserRouter>
  );
}

export default App;

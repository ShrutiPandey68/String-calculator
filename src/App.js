import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from './Components/Order';
import DeliveryBoys from './Components/DeliveryBoys';
import './App.css';
import { Button } from 'react-bootstrap'; 
import AddNumbers from './stringCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
         {/* <Button> <Link to="/orders">Orders</Link> </Button> 
       <Button><Link to="/deliveryboys">Delivery Boys</Link> </Button>    */}
       <Button><Link to="/stringCalculator">StringCalculator</Link> </Button>   

        </nav>

        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/deliveryboys" element={<DeliveryBoys />} />
          <Route path="/stringCalculator" element={<AddNumbers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

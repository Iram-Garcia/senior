import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import ManageVehicles from './components/ManageVehicles';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manage-vehicles" element={<ManageVehicles />} />
    </Routes>
  </Router>
);

export default App;
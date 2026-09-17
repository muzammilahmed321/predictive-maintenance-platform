import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import MachineDetails from './pages/MachineDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/machines/:machineId" element={<MachineDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
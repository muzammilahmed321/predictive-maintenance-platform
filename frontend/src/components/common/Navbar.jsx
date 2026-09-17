import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Predictive Maintenance</h1>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/predict">Predict</Link>
      </div>
    </nav>
  );
}

export default Navbar;
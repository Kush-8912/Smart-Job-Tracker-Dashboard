import { NavLink, Link } from 'react-router-dom';
import { MdDashboard, MdWork, MdBarChart, MdAdd } from 'react-icons/md';
import { RiBriefcase4Fill } from 'react-icons/ri';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <div className="brand-icon">
          <RiBriefcase4Fill color="white" size={16} />
        </div>
        <span className="brand-name">Job<span>Tracker</span></span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/dashboard" className="nav-link">
          <MdDashboard size={16} /> Dashboard
        </NavLink>
        <NavLink to="/applications" className="nav-link">
          <MdWork size={16} /> Applications
        </NavLink>
        <NavLink to="/analytics" className="nav-link">
          <MdBarChart size={16} /> Analytics
        </NavLink>
      </div>

      <div className="navbar-right">
        <Link to="/applications/new" className="btn btn-primary btn-sm">
          <MdAdd size={16} /> Add Job
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

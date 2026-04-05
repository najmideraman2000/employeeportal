import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2>Employee Portal</h2>
            <div className="nav-links">
                <Link to="/">Directory</Link>
                <Link to="/history">Audit History</Link> {/* <-- New Link */}
                <Link to="/add-employee" className="btn btn-primary">+ New Employee</Link>
            </div>
        </nav>
    );
}
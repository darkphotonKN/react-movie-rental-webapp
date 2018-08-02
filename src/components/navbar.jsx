import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <span className="navbar-brand">Menu</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/movies">Movies <span className="sr-only">(current)</span></NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                    <NavLink className="nav-item nav-link" to="/rental">Rental</NavLink>
                    <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;
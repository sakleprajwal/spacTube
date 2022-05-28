import { React, useState } from 'react';
import './Navbar.css';
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import {useAuth} from '../../Contexts/authentication-context/auth-context';

const Navbar = ({ toggleSidebar }) => {
    const {isLoggedIn, handleLogout} = useAuth();

    return (
        <div className="navbar-section flex-row">
            <div className='flex-row'>
                <button className="menu" onClick={toggleSidebar}>
                <AiOutlineMenu />
                </button>
                <div className="navbar-brand">
                    <NavLink to="/" className="category-link"><span>spacTube</span></NavLink>
                </div>
            </div>
            <div className="navbar-actions flex-row">
                {
                    !isLoggedIn ? 
                    <NavLink to="/login" className="category-link" >
                        <button className="navbar-icon-btn"><i className="fas fa-sign-in"></i></button>
                    </NavLink> :
                    <button className="navbar-icon-btn" onClick={handleLogout}><i className="fas fa-sign-out"></i></button>
                }
            </div>
        </div>
    );
};

export default Navbar;
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const user = true;

    return (
        <div className='Navbar'>
            <div className="left">
                <a className='logo'>
                    <img src="/logo.png" alt=""
                        style={{ height: '3.5rem' }} />
                    <span>Property Cart</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className='user'>
                        <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className='profile'>
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <a href="/">SignIn</a>
                        <a href="/" className='Register'>Sign Up</a>
                    </>
                )}
                <div className="menuIcon">
                    <img src="/menu.png" alt="" onClick={() => setOpen(!open)} />
                </div>
                <div className={open ? "menu active" : "menu"}  >
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <Link to="/Login">
                        <button>Login</button>
                    </Link>
                    <Link to="/Register">
                        <button className='register'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
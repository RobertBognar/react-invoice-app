import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../Assets/logo.svg';
import { ReactComponent as Moon } from '../../Assets/icon-moon.svg';
import { ReactComponent as Sun } from '../../Assets/icon-sun.svg';
import user from '../../Assets/image-avatar.jpg';

import { GlobalContext } from '../../Context/GlobalMode';

//Global Container For Side Header
const Header = () => {
    const global = React.useContext(GlobalContext);

    //Toggle Switch Mode Function Passing To Button Below
    //Setting Up localStorage To Save Switch State
    function toggleModeSwitch() {
        global.setMode((mode) => {
            window.localStorage.setItem('mode', mode ? 'light' : 'dark');
            return !mode;
        });
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logoImg" />
                </Link>
            </div>
            <div className="modeUser">
                <div className="mode">
                    <button
                        onClick={toggleModeSwitch}
                    >
                        {global.mode ? (
                            <span>
                                <Sun />
                            </span>
                        ) : (
                            <span>
                                <Moon />
                            </span>
                        )}
                    </button>
                </div>
                <div className="userPhoto">
                    <div className="photo">
                        <img src={user} alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
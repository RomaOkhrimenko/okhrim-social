import React from 'react';

import styles from './Navbar.module.scss'
import {NavLink} from "react-router-dom";

import Chat from '../../assets/images/png/navbar/chat.png'
import Settings from '../../assets/images/png/navbar/settings.png'
import Profile from '../../assets/images/png/navbar/user.png'
import Gamepad from '../../assets/images/png/navbar/gamepad.png'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__title}>OKHRIM SOCIAL</div>

            <div className={styles.navbar__navigation}>
                <NavLink to={'/profile'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Profile} alt="Profile"/>
                </NavLink>
                <NavLink to={'/messages'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Chat} alt="Chat"/>
                </NavLink>
                <NavLink to={'/games'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Gamepad} alt="Gamepad"/>
                </NavLink>
                <NavLink to={'/settings'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Settings} alt="Settings"/>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
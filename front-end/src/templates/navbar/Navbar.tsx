import React from 'react';

import styles from './Navbar.module.scss'
import {NavLink} from "react-router-dom";

import Chat from '../../assets/images/png/navbar/chat.png'
import Friends from '../../assets/images/png/navbar/friends.png'
import Profile from '../../assets/images/png/navbar/user.png'
import Gamepad from '../../assets/images/png/navbar/gamepad.png'
import {useAppSelector} from "../../hooks/redux";

const Navbar = () => {
    const userId = useAppSelector(state => state.user.user._id)
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__title}>OKHRIM SOCIAL</div>

            <div className={styles.navbar__navigation}>
                <NavLink to={`/profile/${userId}`} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Profile} alt="Profile"/>
                </NavLink>
                <NavLink to={'/messages'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Chat} alt="Chat"/>
                </NavLink>
                <NavLink to={'/friends'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Friends} alt="Friends"/>
                </NavLink>
                <NavLink to={'/games'} className={({isActive}) => isActive ? styles.active : ''}>
                    <img src={Gamepad} alt="Gamepad"/>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
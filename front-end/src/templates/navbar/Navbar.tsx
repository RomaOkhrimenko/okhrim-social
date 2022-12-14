import React from 'react';

import styles from './Navbar.module.scss'
import {NavLink} from "react-router-dom";

import {AiFillWechat} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import {FaUserFriends} from "react-icons/fa";
import {IoGameControllerOutline} from "react-icons/io5";

import {useAppSelector} from "../../hooks/redux";

const Navbar = () => {
    // @ts-ignore
    const userId = useAppSelector(state => state.user.user._id)
    const incomeRequests = useAppSelector(state => state.user.user.profile?.friends.incomeRequests)
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__title}>OKHRIM SOCIAL</div>

            <div className={styles.navbar__navigation}>
                <NavLink to={`/profile/${userId}`} className={({isActive}) => isActive ? styles.active : ''}>
                    <AiOutlineUser />
                </NavLink>
                <NavLink to={'/messages'} className={({isActive}) => isActive ? styles.active : ''}>
                    <AiFillWechat />
                </NavLink>
                <NavLink to={'/friends'} className={({isActive}) => isActive ? styles.active : ''}>
                    <FaUserFriends />
                    {incomeRequests?.length && <span>+{incomeRequests?.length! > 9 ? '+9' : incomeRequests?.length!}</span>}
                </NavLink>
                <NavLink to={'/games'} className={({isActive}) => isActive ? styles.active : ''}>
                    <IoGameControllerOutline />
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
import React, {useEffect, useState} from 'react';

import styles from './Header.module.scss'

import {ReactComponent as Notification } from "../../assets/images/svg/notification-ico.svg";
import {ReactComponent as ArrowDown } from "../../assets/images/svg/arrow-down.svg";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/redux/actions/authAction";

const Header = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const userId = useAppSelector(state => state.user.user._id)

    const dispatch = useAppDispatch()

    const handleShowMenu = (e: any) => {
        if(isShowMenu) {
            if(e.target.closest('.header_menu') || e.target.closest('.header_avatar')) {
                return
            }
            setIsShowMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleShowMenu)
    }, [])

    return (
        <div className={styles.header}>
            <div className={styles.header__content}>

                <div className={styles.header__content_notification}>
                    <Notification />
                    <span className={styles.header__content_notification_count}>3</span>
                </div>

                <div onClick={() => setIsShowMenu(prev => !prev)} className={`${styles.header__content_avatar} header_avatar ${isShowMenu ? styles.active : ''}`}>
                    <div className={styles.header__content_avatar_image} />
                    <ArrowDown />
                </div>

                <div className={`${styles.header__content_menu} header_menu ${isShowMenu ? styles.active : ''}`}>
                    <Link to={'/settings'}>Settings</Link>
                    <Link to={`/profile/${userId}`}>Profile</Link>
                    <span onClick={() => dispatch(logout())}>Log out</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
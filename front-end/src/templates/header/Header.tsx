import React, {useEffect, useState} from 'react';

import styles from './Header.module.scss'

import {ReactComponent as Notification } from "../../assets/images/svg/notification-ico.svg";
import {ReactComponent as ArrowDown } from "../../assets/images/svg/arrow-down.svg";
import DefaultUserImage from '../../assets/images/png/User.png'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/redux/actions/authAction";

const Header = () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [image, setImage] = useState<string | undefined>('')
    const user = useAppSelector(state => state.user.user)

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

    useEffect(() => {
        if(user.profile?.image?.url) {
            setImage(user.profile?.image?.url)
        }
    }, [user])

    return (
        <div className={styles.header}>
            <span className={styles.header__brand}>Okhrim Social</span>
            <div className={styles.header__content}>

                <div className={styles.header__content_notification}>
                    <Notification />
                    <span className={styles.header__content_notification_count}>3</span>
                </div>

                <div onClick={() => setIsShowMenu(prev => !prev)} className={`${styles.header__content_avatar} header_avatar ${isShowMenu ? styles.active : ''}`}>
                    <img className={styles.header__content_avatar_image} src={image ? image : DefaultUserImage} alt=""/>
                    <ArrowDown />
                </div>

                <div className={`${styles.header__content_menu} header_menu ${isShowMenu ? styles.active : ''}`}>
                    <span onClick={() => dispatch(logout(user._id))}>Log out</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
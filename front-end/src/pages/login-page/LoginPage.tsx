import React, {FC, useEffect, useState} from 'react';

import styles from './loginPage.module.scss'

import image from '../../assets/images/png/login-woman.png'
import LoginForm from "../../templates/login-page/login-form/LoginForm";
import Button from "../../ui/Button";
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router";

const LoginPage: FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const isAuth = useAppSelector(state => state.user.isAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuth) {
            navigate('/profile')
        }
    }, [isAuth])

    return (
        <div className={styles.login_page}>
            <div className={styles.login_page__info}>
                <h2>{isLogin ? 'Sign In to find your team' : 'Sign Up to find your team'}</h2>
                <p> if you don’t an account
                    you can Register here!</p>
            </div>
            <div className={styles.login_page__image}>
                <img src={image} alt="image"/>
            </div>
            <div className={styles.login_page__variants}>
                <Button onClick={() => setIsLogin(true)} className={`${styles.login_page__variants_btn} ${isLogin ? styles.active : ''}`}>Sign in</Button>
                <Button onClick={() => setIsLogin(false)} className={`${styles.login_page__variants_btn} ${isLogin ? '' : styles.active}`}>Sign up</Button>
            </div>
            <LoginForm isLogin={isLogin} />
        </div>
    );
};

export default LoginPage;
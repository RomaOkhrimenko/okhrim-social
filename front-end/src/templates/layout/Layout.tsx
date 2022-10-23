import React, {FC, ReactNode, useEffect} from 'react';

import styles from './Layout.module.scss'
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router";

interface IProps {
    children: ReactNode
}

const Layout: FC<IProps> = ({children}) => {
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
        //@ts-ignore
        if(!user.profile.isComplete) {
            navigate('/settings-account')
        }
    }, [])

    return (
        <div>
            <Navbar />
            <Header />

            <div className={`${styles.main_content} container`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
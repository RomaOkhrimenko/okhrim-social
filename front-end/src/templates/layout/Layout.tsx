import React, {FC, ReactNode, useEffect} from 'react';

import styles from './Layout.module.scss'
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router";

interface IProps {
    children: ReactNode
    isContainer?: boolean
}

const Layout: FC<IProps> = ({children, isContainer = true}) => {
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
        //@ts-ignore
        if(!user.profile.isComplete) {
            navigate('/settings-account')
        }
    }, [user])

    if(!user.profile!.isComplete) {
        return <div></div>
    }

    return (
        <div>
            <Navbar />
            <Header />
            <div className={`${styles.main_content} ${isContainer ? 'container' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
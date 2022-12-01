import React, {FC, ReactNode, useEffect, Suspense} from 'react';

import styles from './Layout.module.scss'
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router";
import Loader from "../loader/Loader";

interface IProps {
    children: ReactNode
    isContainer?: boolean
    isPaddingBottom?: boolean
}

const Layout: FC<IProps> = ({children, isContainer = true, isPaddingBottom = true}) => {
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
        //@ts-ignore
        if(!user.profile.isComplete) {
            navigate('/settings-account')
        }
    }, [user])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [window.location.href])

    if(!user.profile!.isComplete) {
        return <div></div>
    }

    return (
        <div>
            <Navbar />
            <Header />
            <Suspense fallback={<Loader />}>
                <div className={`${styles.main_content} ${isContainer ? 'container' : ''} ${isPaddingBottom ? styles._padding : ''}`}>
                        {children}
                </div>
            </Suspense>

        </div>
    );
};

export default Layout;
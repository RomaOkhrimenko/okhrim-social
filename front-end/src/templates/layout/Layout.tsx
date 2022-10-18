import React, {FC, ReactNode} from 'react';

import styles from './Layout.module.scss'
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";

interface IProps {
    children: ReactNode
}

const Layout: FC<IProps> = ({children}) => {
    return (
        <div>
            <Navbar />
            <Header />

            <div className={`${styles.main_content} container-lg`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
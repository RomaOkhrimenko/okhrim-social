import React from 'react';

import styles from './ChatHeader.module.scss'

import Image from '../../../../assets/images/png/settings-man.png'
import {ReactComponent as CloseIco} from "../../../../assets/images/svg/close.svg";

const ChatHeader = () => {
    return (
        <div className={styles.chat_header}>
            <div className={styles.chat_header__info}>
                <img src={Image} alt="Image"/>

                <span>Roma Okhrimenko</span>
            </div>

            <div className={styles.chat_header__close}>
                <CloseIco />
            </div>
        </div>
    );
};

export default ChatHeader;
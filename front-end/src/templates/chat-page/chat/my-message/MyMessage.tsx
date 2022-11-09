import React, {FC, useEffect} from 'react';

import styles from './MyMessage.module.scss'

import Image from '../../../../assets/images/png/settings-man.png'
import {log} from "util";

interface IProps {
    message: {
        fromSelf: boolean
        message: string
    }
}

const MyMessage: FC<IProps>= ({message}) => {
    useEffect(() => {
        console.log('message')
    }, [])
    return (
        <div className={styles.my_message}>
            <img src={Image} alt=""/>
            <span>{message.message}</span>
            <p>12:00 PM</p>
        </div>
    );
};

export default MyMessage;
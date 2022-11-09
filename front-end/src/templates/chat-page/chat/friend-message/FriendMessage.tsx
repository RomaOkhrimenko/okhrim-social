import React, {FC} from 'react';

import styles from './FriendMessage.module.scss'

import Image from '../../../../assets/images/png/settings-man.png'

interface IProps {
    message: {
        fromSelf: boolean
        message: string
    }
}

const FriendMessage: FC<IProps> = ({message}) => {
    return (
        <div className={styles.friend_message}>
            <img src={Image} alt=""/>
            <span>{message.message}</span>
            <p>12:00 PM</p>
        </div>
    );
};

export default FriendMessage;
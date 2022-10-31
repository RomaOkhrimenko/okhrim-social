import React from 'react';

import styles from './FriendMessage.module.scss'

import Image from '../../../../assets/images/png/settings-man.png'

const FriendMessage = () => {
    return (
        <div className={styles.friend_message}>
            <img src={Image} alt=""/>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aperiam autem blanditiis dolorem earum eveniet, minima minus molestiae omnis quibusdam quidem quo ratione reprehenderit rerum sint soluta tempore voluptates?</span>
            <p>12:00 PM</p>
        </div>
    );
};

export default FriendMessage;
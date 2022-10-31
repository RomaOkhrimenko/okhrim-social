import React from 'react';

import styles from './MessageListBlock.module.scss'

import Image from '../../../../assets/images/png/settings-man.png'

const MessageListBlock = () => {
    return (
        <div className={styles.message_list_block}>
            <div className={styles.message_list_block__container}>
                <div>
                    <img src={Image} alt=""/>
                </div>

                <div className={styles.message_list_block__info}>
                    <span>Roma Okhrimenko</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            <div className={styles.message_list_block__clock}>11:05 PM</div>
        </div>
    );
};

export default MessageListBlock;
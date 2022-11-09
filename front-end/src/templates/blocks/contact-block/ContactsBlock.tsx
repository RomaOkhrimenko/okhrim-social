import React, {FC} from 'react';

import styles from './ContactsBlock.module.scss'

import Image from '../../../assets/images/png/settings-man.png'

interface IProps {
    onClick: () => void,
    contact: {
        username: string,
        id: string
    }
}

const ContactsBlock: FC<IProps> = ({onClick, contact}) => {
    return (
        <div className={styles.message_list_block} onClick={onClick}>
            <div className={styles.message_list_block__container}>
                <div>
                    <img src={Image} alt=""/>
                </div>

                <div className={styles.message_list_block__info}>
                    <span>{contact.username}</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            <div className={styles.message_list_block__clock}>11:05 PM</div>
        </div>
    );
};

export default ContactsBlock;
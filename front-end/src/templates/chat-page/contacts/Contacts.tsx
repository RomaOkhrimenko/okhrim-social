import React, {FC, useState} from 'react';

import styles from './Contacts.module.scss'

import {AiOutlineMenu} from 'react-icons/ai'
import DefaultPhotoUser from '../../../assets/images/png/User.png'
import {IFriends} from "../../../models/IFriends";

interface IContacts {
    contacts: IFriends['friends']
    setCurrentChat: (arg0: any) => void
    username: string
}

// CONTACT BLOCK TO DO OTHER COMPONENT

const Contacts: FC<IContacts> = ({contacts, setCurrentChat, username}) => {
    const [currentSelected, setCurrentSelected] = useState<number | null>(null)
    const [isActive, setIsActive] = useState(false)

    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentSelected(index);
        setCurrentChat(contact);
    }
    return (
        <div className={`${styles.contacts} ${isActive ? '' : styles.hidden}`}>

            <div className={styles.contacts__brand}>
                <AiOutlineMenu onClick={() => setIsActive(prev => !prev)} />
            </div>

            <div className={`${styles.contacts__list} ${isActive ? '' : styles.hidden}`}>
                {contacts.length ? contacts.map((contact, index) => {
                    return (
                        <div
                            key={contact._id}
                            className={`${styles.contact_block} ${
                                index === currentSelected ? styles.selected : ""
                            }`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <div className={styles.contact_block__avatar}>
                                <img
                                    src={contact.profile.image?.url ? contact.profile.image.url : DefaultPhotoUser}
                                    alt={contact.profile.username}
                                />
                            </div>
                            <div className={styles.contact_block__username}>
                                <h3>{contact.profile.username}</h3>
                            </div>
                        </div>
                    );
                }) : <h2>You dont have friends</h2>}
            </div>
        </div>
    );
};

export default Contacts;
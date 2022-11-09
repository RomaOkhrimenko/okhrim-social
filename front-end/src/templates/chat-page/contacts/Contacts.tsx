import React, {FC, useState} from 'react';

import styles from './Contacts.module.scss'

import AVATAR from '../../../assets/images/png/settings-man.png'
import {IFriends} from "../../../models/IFriends";

interface IContacts {
    contacts: IFriends['friends']
    setCurrentChat: (arg0: any) => void
    username: string
}

// CONTACT BLOCK TO DO OTHER COMPONENT

const Contacts: FC<IContacts> = ({contacts, setCurrentChat, username}) => {
    const [currentSelected, setCurrentSelected] = useState<number | null>(null)
    const [search, setSearch] = useState('')

    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentSelected(index);
        setCurrentChat(contact);
    }
    return (
        <div className={styles.contacts}>

            <div className={styles.contacts__brand}>
                <h3>Okhrim Social</h3>
            </div>

            <div className={styles.contacts__list}>
                {contacts.map((contact, index) => {
                    return (
                        <div
                            key={contact.id}
                            className={`${styles.contact_block} ${
                                index === currentSelected ? styles.selected : ""
                            }`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <div className={styles.contact_block__avatar}>
                                <img
                                    src={AVATAR}
                                    alt=""
                                />
                            </div>
                            <div className={styles.contact_block__username}>
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.contacts__current_user}>
                <div className={styles.contacts__current_user_avatar}>
                    <img
                        src={AVATAR}
                        alt="avatar"
                    />
                </div>
                <div className={styles.contacts__current_user_username}>
                    <h2>{username}</h2>
                </div>
            </div>

           {/*<div className={styles.messages_list__input}>*/}
           {/*     <SearchIco />*/}
           {/*    <Input value={search} setValue={setSearch} name={'search'} placeholder={'search messages'} />*/}
           {/*</div>*/}
            {/*{*/}
            {/*    contacts.map((contact) => {*/}
            {/*        return <ContactsBlock key={contact.id} contact={contact} onClick={() => setCurrentChat(contact)} />*/}
            {/*    })*/}
            {/*}*/}
        </div>
    );
};

export default Contacts;
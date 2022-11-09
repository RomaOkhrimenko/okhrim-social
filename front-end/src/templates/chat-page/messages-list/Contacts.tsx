import React, {FC, useState} from 'react';

import styles from './Contacts.module.scss'

import {ReactComponent as SearchIco} from "../../../assets/images/svg/search.svg";

import Input from "../../../ui/Input";
import ContactsBlock from "../../blocks/contact-block/ContactsBlock";
import {IFriends} from "../../../models/IFriends";

interface IContacts {
    contacts: IFriends['friends']
    setCurrentChat: (arg0: any) => void
}

const Contacts: FC<IContacts> = ({contacts, setCurrentChat}) => {
    const [search, setSearch] = useState('')
    return (
        <div className={styles.messages_list}>
           <div className={styles.messages_list__input}>
                <SearchIco />
               <Input value={search} setValue={setSearch} name={'search'} placeholder={'search messages'} />
           </div>
            {
                contacts.map((contact) => {
                    return <ContactsBlock key={contact.id} contact={contact} onClick={() => setCurrentChat(contact)} />
                })
            }
        </div>
    );
};

export default Contacts;
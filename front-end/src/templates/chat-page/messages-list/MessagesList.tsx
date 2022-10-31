import React, {useState} from 'react';

import styles from './MessagesList.module.scss'

import {ReactComponent as SearchIco} from "../../../assets/images/svg/search.svg";

import Input from "../../../ui/Input";
import MessageListBlock from "./message-list-block/MessageListBlock";

const MessagesList = () => {
    const [search, setSearch] = useState('')
    return (
        <div className={styles.messages_list}>
           <div className={styles.messages_list__input}>
                <SearchIco />
               <Input value={search} setValue={setSearch} name={'search'} placeholder={'search messages'} />
           </div>

            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
            <MessageListBlock />
        </div>
    );
};

export default MessagesList;
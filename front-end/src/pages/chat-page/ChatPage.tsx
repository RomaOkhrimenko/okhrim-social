import React from 'react';

import styles from './ChatPage.module.scss'
import Chat from "../../templates/chat-page/chat/Chat";
import MessagesList from "../../templates/chat-page/messages-list/MessagesList";

const ChatPage = () => {
    return (
        <div className={styles.chat_page}>

            <div className={styles.chat_page__message}>
                <Chat />
            </div>

            <div className={styles.chat_page__messages_list}>
                <MessagesList />
            </div>
        </div>
    );
};

export default ChatPage;
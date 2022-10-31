import React, {useState} from 'react';

import styles from './Chat.module.scss'
import ChatHeader from "./chat-header/ChatHeader";
import MyMessage from "./my-message/MyMessage";
import FriendMessage from "./friend-message/FriendMessage";
import Input from "../../../ui/Input";

import {ReactComponent as MessageSubmitIco} from "../../../assets/images/svg/messageSubmitIco.svg";

const Chat = () => {
    const [message, setMessage] = useState('')

    return (
        <div className={styles.chat}>
            <ChatHeader />
            <div className={styles.chat__container}>
                <MyMessage/>
                <FriendMessage />
                <FriendMessage />
                <FriendMessage />
                <FriendMessage />
                <FriendMessage />
                <FriendMessage />
            </div>

            <div className={styles.chat__message}>
                <Input value={message} setValue={setMessage} name={'message'} placeholder={'Type your message...'} />
                <MessageSubmitIco />
            </div>
        </div>
    );
};

export default Chat;
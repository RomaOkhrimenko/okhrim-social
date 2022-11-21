import React, {useEffect, useState, useRef, useContext} from 'react';

import styles from './ChatPage.module.scss'
import Messages from "../../templates/chat-page/chat/Messages";
import Contacts from "../../templates/chat-page/contacts/Contacts";
import {IFriends} from "../../models/IFriends";
import {useAppSelector} from "../../hooks/redux";
import {instance} from "../../http";
import {io} from 'socket.io-client'
import Welcome from "../../templates/chat-page/welcome/Welcome";
import {Context} from "../../store/context/context";
import {ICurrentChat} from "../../models/ICurrentChat";

const Chat = () => {
    const socket = useRef(null)
    const user = useAppSelector(state => state.user.user)
    const {currentChatDefault} = useContext(Context)
    const [currentChat, setCurrentChat] = useState<ICurrentChat | null >(null)
    const [contacts, setContacts] = useState<IFriends['friends']>([])

    const resetCurrentChat = () => {
        setCurrentChat(null)
    }

    useEffect(() => {
        if(user) {
            // @ts-ignore
            socket.current = io(process.env.API_URL)
            // @ts-ignore
            socket.current.emit('add-user', user._id)
        }
    }, [user])

    useEffect(() => {
        if(currentChatDefault.id) {
            setCurrentChat(currentChatDefault)
        }
    }, [currentChatDefault])

    useEffect(() => {
        const getFriends = async () => {
            if(user) {
                await instance.get(`/friends/${user._id}`)
                    .then(({data}) => setContacts(data))
            }
        }
        getFriends()
    }, [currentChat])


    return (
        <div className={styles.chat_page}>

            <div className={styles.chat_page__container}>
                {
                    currentChat
                        ?
                        <Messages currentChat={currentChat} user={user} socket={socket} resetCurrentChat={resetCurrentChat} />
                        :
                        <Welcome username={user.profile?.username!} />
                }

                <Contacts contacts={contacts} setCurrentChat={setCurrentChat} username={user.profile?.username!} />

            </div>

        </div>
    );
};

export default Chat;
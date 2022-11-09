import React, {useEffect, useState, useRef} from 'react';

import styles from './ChatPage.module.scss'
import Messages from "../../templates/chat-page/chat/Messages";
import Contacts from "../../templates/chat-page/contacts/Contacts";
import {IFriends} from "../../models/IFriends";
import {useAppSelector} from "../../hooks/redux";
import {instance} from "../../http";
import {io} from 'socket.io-client'
import Welcome from "../../templates/chat-page/welcome/Welcome";

const Chat = () => {
    const socket = useRef(null)
    const user = useAppSelector(state => state.user.user)
    const [currentChat, setCurrentChat] = useState<{username: string, image: string, id: string } | null >(null)
    const [contacts, setContacts] = useState<IFriends['friends']>([])

    const resetCurrentChat = () => {
        setCurrentChat(null)
    }

    useEffect(() => {
        if(user) {
            // @ts-ignore
            socket.current = io('http://localhost:4000')
            // @ts-ignore
            socket.current.emit('add-user', user._id)
        }
    }, [user])

    useEffect(() => {
        const getFriends = async () => {
            if(user) {
                await instance.get(`/friends/${user._id}`)
                    .then(({data}) => setContacts(data.profile.friends.friends))
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
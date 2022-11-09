import React, {useEffect, useState, useRef} from 'react';

import styles from './ChatPage.module.scss'
import Messages from "../../templates/chat-page/chat/Messages";
import Contacts from "../../templates/chat-page/messages-list/Contacts";
import {IFriends} from "../../models/IFriends";
import {useAppSelector} from "../../hooks/redux";
import {instance} from "../../http";
import {io} from 'socket.io-client'

const Chat = () => {
    const socket = useRef(null)
    const user = useAppSelector(state => state.user.user)
    const [currentChat, setCurrentChat] = useState<{username: string, image: string, id: string } | null >(null)
    const [contacts, setContacts] = useState<IFriends['friends']>([])

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

            <div className={styles.chat_page__message}>
                {
                    currentChat
                        ?
                        <Messages currentChat={currentChat} user={user} socket={socket} />
                        :
                        <h2>Nothing</h2>
                }
            </div>

            <div className={styles.chat_page__messages_list}>
                <Contacts contacts={contacts} setCurrentChat={setCurrentChat} />
            </div>
        </div>
    );
};

export default Chat;
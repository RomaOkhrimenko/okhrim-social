import React, {useEffect, useState, useRef, useContext} from 'react';

import styles from './ChatPage.module.scss'
import Messages from "../../templates/chat-page/chat/Messages";
import Contacts from "../../templates/chat-page/contacts/Contacts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {instance} from "../../http";
import Welcome from "../../templates/chat-page/welcome/Welcome";
import {Context} from "../../store/context/context";
import {ICurrentChat} from "../../models/ICurrentChat";
import {notify} from "../../utils/notification/alerts";
import {addNotifications, resetNotifications} from "../../store/redux/slices/userSlice";

const Chat = () => {
    const user = useAppSelector(state => state.user.user)
    const {currentRoom, currentChatDefault, socket, members, setMembers, setCurrentRoom,} = useContext(Context)
    const dispatch = useAppDispatch()
    const joinRoom = (room: any, isPublic = false) => {
        if(!user) {
            return notify('error', 'Please login')
        }
        socket.emit('join-room', room)

        dispatch(resetNotifications(room))
    }

    socket.off('notifications').on('notifications', (room: any) => {
        if(orderIds(user._id, currentRoom?._id!) != room) dispatch(addNotifications(room))
    })

    const resetCurrentChat = () => {
        setCurrentRoom(null)
    }

    const orderIds = (id1: string, id2: string) => {
        if(id1 > id2) {
            return id1 + '-' + id2
        } else {
            return id2 + '-' + id1
        }
    }

    const handleCurrentChat = (chat: ICurrentChat) => {
        setCurrentRoom(chat)
        const roomId = orderIds(user._id, chat._id)
        joinRoom(roomId)
    }

    useEffect(() => {
        const getFriends = async () => {
            if(user) {
                await instance.get(`/friends/${user._id}`)
                    .then(({data}) => setMembers(data))
            }
        }
        getFriends()
    }, [currentRoom])


    return (
        <div className={styles.chat_page}>

            <div className={styles.chat_page__container}>
                {
                    currentRoom
                        ?
                        <Messages orderIds={orderIds} user={user} socket={socket} resetCurrentChat={resetCurrentChat} />
                        :
                        <Welcome username={user.profile?.username!} />
                }

                <Contacts members={members} orderIds={orderIds} setCurrentChat={handleCurrentChat} username={user.profile?.username!} />

            </div>

        </div>
    );
};

export default Chat;
import React, {FC, useContext, useEffect, useRef, useState} from 'react';

import styles from './Messages.module.scss'
import MessagesHeader from "./messages-header/MessagesHeader";
import {IUser} from "../../../models/IUser";
import {instance} from "../../../http";
//@ts-ignore
import {v4 as uuidv4} from 'uuid'
import MessageInput from "./message-input/MessageInput";
import {ICurrentChat} from "../../../models/ICurrentChat";
import {Context} from "../../../store/context/context";
import {useAppSelector} from "../../../hooks/redux";

interface IProps {
    user: IUser
    socket?: any,
    resetCurrentChat: () => void,
    orderIds: (arg0: string, arg1: string) => string
}

const Messages: FC<IProps> = ({user, resetCurrentChat, orderIds}) => {
    const {socket, currentRoom, messages, setMessages, privateMemberMsg} = useContext(Context)
    const scrollRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate()

    socket.off('room-messages').on("room-messages", (roomMessages: any) => {
        console.log('messages', roomMessages)
        setMessages(roomMessages)
    })

    const handleSendMessage = async (message: string) => {
        if(!message) return
        const today = new Date()
        const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
        const time = today.getHours() + ':' + minutes
        const roomId = orderIds(user._id, currentRoom?._id!)
        socket.emit('message-room', roomId, message, user._id, time, todayDate)
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return (
        <div className={`${styles.messages}`}>
            <MessagesHeader username={currentRoom?.profile?.username!} image={currentRoom?.profile?.image.url} resetCurrentChat={resetCurrentChat} />

            <div className={`${styles.messages__list}`}>
                {messages[0]?.messagesByDate.map((message : any) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`${styles.messages__list_message} ${
                                    message.from === user._id ? styles.sended : styles.recieved
                                }`}
                            >
                                <div className={styles.messages__list_message_content}>
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    );
};

export default Messages;
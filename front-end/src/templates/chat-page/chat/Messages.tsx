import React, {FC, useEffect, useRef, useState} from 'react';

import styles from './Messages.module.scss'
import ChatHeader from "./chat-header/ChatHeader";
import MyMessage from "./my-message/MyMessage";
import FriendMessage from "./friend-message/FriendMessage";
import {IUser} from "../../../models/IUser";
import {instance} from "../../../http";
//@ts-ignore
import {v4 as uuidv4} from 'uuid'
import MessageInput from "./message-input/MessageInput";

interface IProps {
    currentChat: {
        username: string,
        image: string,
        id: string} | null
    user: IUser
    socket: any
}

const Messages: FC<IProps> = ({currentChat, user, socket}) => {
    const [messages, setMessages] = useState<any>([])
    const [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const scrollRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const handleSendMessage = async (message: string) => {
        socket.current.emit('send-message', {
            to: currentChat?.id,
            from: user._id,
            message
        })

        await instance.post('/add-message', {
            from: user._id,
            to: currentChat?.id,
            message
        })


        const msgs = [...messages]
        msgs.push({fromSelf: true, message})
        setMessages(msgs)
    }

    useEffect(() => {
        if(socket.current) {
            socket.current.on('message-recieve', (message: any) => {
                console.log(message)
                setArrivalMessage({fromSelf: false, message})
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    useEffect(() => {
        const getMessage = async () => {
            await instance.post('/messages', {
                from: user._id,
                to: currentChat?.id
            }).then(({data}) => setMessages(data))
        }
        getMessage()
    }, [])

    return (
        <div className={styles.chat}>
            <ChatHeader />
            <div ref={scrollRef} key={uuidv4()} className={styles.chat__container}>
                {!messages.length && <div className={styles.chat__empty}>
                    <span>Don't have messages yet</span>
                </div>}

                {messages.length && messages.map((message: any, index: number) => {
                    return !message.fromSelf ? <MyMessage message={message} key={index} /> : <FriendMessage message={message} key={index} />
                })}
            </div>

            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    );
};

export default Messages;
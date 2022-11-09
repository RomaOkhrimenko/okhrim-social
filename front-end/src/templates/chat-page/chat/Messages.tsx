import React, {FC, useEffect, useRef, useState} from 'react';

import styles from './Messages.module.scss'
import MessagesHeader from "./messages-header/MessagesHeader";
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
    socket: any,
    resetCurrentChat: () => void
}

const Messages: FC<IProps> = ({currentChat, user, socket, resetCurrentChat}) => {
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
        <div className={styles.messages}>
            <MessagesHeader username={currentChat?.username!} resetCurrentChat={resetCurrentChat} />

            <div className={`${styles.messages__list}`}>
                {messages.map((message : any) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`${styles.messages__list_message} ${
                                    message.fromSelf ? styles.sended : styles.recieved
                                }`}
                            >
                                <div className={styles.messages__list_message_content}>
                                    <p>{message.message}</p>
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
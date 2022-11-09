import React, {FC, useState} from 'react';

import styles from './MessageInput.module.scss'
import Input from "../../../../ui/Input";
import {ReactComponent as MessageSubmitIco} from "../../../../assets/images/svg/messageSubmitIco.svg";

interface IProps {
    handleSendMessage: (arg0: string) => void
}

const MessageInput: FC<IProps> = ({handleSendMessage}) => {
    const [text, setText] = useState('')

    const submitMessage = () => {
        handleSendMessage(text)
        setText('')
    }
    return (
        <div className={styles.chat__message}>
            <Input value={text} setValue={setText} name={'message'} placeholder={'Type your message...'} />
            <MessageSubmitIco onClick={submitMessage} />
        </div>
    );
};

export default MessageInput;
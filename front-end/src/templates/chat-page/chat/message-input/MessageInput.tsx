import React, {FC, FormEvent, useState} from 'react';

import styles from './MessageInput.module.scss'
import Input from "../../../../ui/Input";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";

interface IProps {
    handleSendMessage: (arg0: string) => void
}

const MessageInput: FC<IProps> = ({handleSendMessage}) => {
    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event: any, emojiObject: any) => {
        let message = text;
        message += emojiObject.emoji;
        setText(message);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text.length > 0) {
            handleSendMessage(text)
            setText('')
        }
    }
    return (
        <div className={styles.message_input}>
            <div className={styles.message_input__container}>
                <div className={styles.message_input__emoji}>
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>

            <form className={styles.message_input__form} onSubmit={(e) => onSubmit(e)}>
                <Input
                    name='message-input'
                    type="text"
                    placeholder="type your message here"
                    setValue={setText}
                    value={text}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
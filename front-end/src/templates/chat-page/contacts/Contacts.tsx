import React, {FC, useState} from 'react';

import styles from './Contacts.module.scss'

import {AiOutlineMenu} from 'react-icons/ai'
import DefaultPhotoUser from '../../../assets/images/png/User.png'
import {IFriends} from "../../../models/IFriends";
import {useAppSelector} from "../../../hooks/redux";

interface IContacts {
    members: IFriends['friends']
    setCurrentChat: (arg0: any) => void
    username: string
    orderIds: (arg0: string, arg1: string) => string
}

// CONTACT BLOCK TO DO OTHER COMPONENT

const Contacts: FC<IContacts> = ({members, setCurrentChat, username, orderIds}) => {
    const [currentSelected, setCurrentSelected] = useState<number | null>(null)
    const [isActive, setIsActive] = useState(false)
    const newMessages = useAppSelector(state => state.user.user.newMessages)
    const userId = useAppSelector(state => state.user.user._id)

    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentSelected(index);
        setCurrentChat(contact);
        setIsActive(false)
    }
    return (
        <div className={`${styles.contacts} ${isActive ? '' : styles.hidden}`}>

            <div className={styles.contacts__brand}>
                <AiOutlineMenu onClick={() => setIsActive(prev => !prev)} />
            </div>

            <div className={`${styles.contacts__list} ${isActive ? '' : styles.hidden}`}>
                {members.length ? members.map((member, index) => {
                    return (
                        <div
                            key={member._id}
                            className={`${styles.contact_block} ${
                                index === currentSelected ? styles.selected : ""
                            }`}
                            onClick={() => changeCurrentChat(index, member)}
                        >
                            <div className={styles.contact_block__avatar}>
                                <img
                                    src={member.profile.image?.url ? member.profile.image.url : DefaultPhotoUser}
                                    alt={member.profile.username}
                                />
                            </div>
                            <div className={styles.contact_block__username}>
                                <h3>{member.profile.username}</h3>
                            </div>
                            {newMessages && newMessages[orderIds(userId, member._id)] && <span className={styles.contact_block__notification}>{newMessages[orderIds(userId, member._id)] > 9 ? '9+' : newMessages[orderIds(userId, member._id)]}</span>}
                        </div>
                    );
                }) : <h2>You dont have friends</h2>}
            </div>
        </div>
    );
};

export default Contacts;
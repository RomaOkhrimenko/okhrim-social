import React, {FC, useContext, useEffect, useRef, useState} from 'react';

import styles from './ProfileTop.module.scss'

import {AiOutlineEdit, AiOutlineCamera} from 'react-icons/ai'
import Banner from '../../../assets/images/jpeg/game-banner.jpg'
import User from '../../../assets/images/png/User.png'
import Button from "../../../ui/Button";
import {useAppDispatch} from "../../../hooks/redux";
import {onAcceptFriendRequest, onAddFriend, onDeleteFriendRequest} from "../../../utils/functions/friends";
import Input from "../../../ui/Input";
import {notify} from "../../../utils/notification/alerts";
import InputUpload from "../../../ui/InputUpload";
import {Context} from "../../../store/context/context";
import {useNavigate} from "react-router";

interface IProfileTop {
    image: string,
    name: string,
    description: string,
    isMe: boolean,
    isFriend: boolean,
    isCandidate: boolean,
    userId: string,
    friendId: string,
    isOutComeRequest: boolean,
    handleEditStatus?: (arg0: boolean) => void,
    onSave?: () => void,
    setUsername?: (arg0: string) => void
    onCancel?: () => void
    setImage?: (arg0: string) => void
}

const ProfileTop: FC<IProfileTop> = ({image, setImage, handleEditStatus, onCancel, setUsername,  onSave, name, isMe, isCandidate, isFriend, userId, friendId, isOutComeRequest}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isEditUsername, setIsEditUsername] = useState(false)
    const inputUploadRef = useRef()
    const {setCurrentChatDefault} = useContext(Context)
    const navigate = useNavigate()

    const handleEdit = (status: boolean) => {
        setIsEdit(status)
        if(handleEditStatus) {
            handleEditStatus(status)
        }
    }

    const onCancelEdit = () => {
        setIsEdit(false)
        if(handleEditStatus && onCancel) {
            handleEditStatus(false)
            setIsEditUsername(false)
            onCancel()
        }
    }

    const onSaveEdit = () => {
        if(!name.trim()) {
            return
        }
        setIsEdit(false)
        if(handleEditStatus && onSave) {
            onSave()
            setIsEditUsername(false)
            handleEditStatus(false)
        }
    }

    const handleUsernameValue = (text: string) => {
        if(text.length > 15) {
            notify('warning', 'username cant be longer than 16 words')
            return
        }
        if(setUsername) {
            setUsername(text)
        }
    }

    const handleUsernameStatus = () => {
        if(name.length) {
            setIsEditUsername(prev => !prev)
        }
    }

    const onChangeProfilePicture = () => {
        if(isEdit) {
            //@ts-ignore
            inputUploadRef.current.click()
        }
    }

    const onSendMessage = () => {
        setCurrentChatDefault({id: friendId, username: name, _id: friendId, image})
        navigate('/messages')
    }

    const dispatch = useAppDispatch()

    return (
        <div className={styles.profile_top}>
            {/*${isEdit ? styles.edit : ''}*/}
            <div className={`${styles.profile_top__banner} `}>
                <img src={Banner} alt={'settings banner'} />

                <AiOutlineEdit />
            </div>

            <div className={styles.profile_top__content}>
                <div className={styles.profile_top__content_left}>
                    <div className={`${styles.profile_top__content_left_avatar} ${isEdit ? styles.edit : ''}`} onClick={onChangeProfilePicture}>
                        <img src={image ? image : User} alt={`Okhrim social user: ${name}`} />
                        <AiOutlineCamera />

                        {isEdit && <InputUpload name={'profile-picture'} setImage={setImage!} isShowPreview={false} ref={inputUploadRef} hidden={true} />}
                    </div>
                    <div>
                        <div className={`${styles.profile_top__content_left_name} ${!name.length ? styles.error : ''}`}>
                            {!isEditUsername && <h2>{name}</h2>}
                            {isEditUsername && <Input value={name} setValue={handleUsernameValue} name={'username'} />}
                            {isEdit && <AiOutlineEdit onClick={handleUsernameStatus} />}
                        </div>
                        {/*<span>19 years</span>*/}
                        {/*<p>{description}</p>*/}
                    </div>
                </div>
                {isMe ?
                    <div className={styles.profile_top__content_right}>
                        {
                            isEdit
                                ?
                                <>
                                    <Button onClick={() => onCancelEdit()} className={styles.profile_top__content_right_cancel}>Cancel</Button>
                                    <Button onClick={() => onSaveEdit()} className={styles.profile_top__content_right_save}>Save</Button>
                                </>
                                :
                                <>
                                    <Button onClick={() => handleEdit(true)} className={styles.profile_top__content_right_save}>Edit</Button>
                                </>

                        }
                    </div>
                    :
                    <div className={styles.profile_top__content_right}>
                        {isCandidate && <Button onClick={() => onAcceptFriendRequest(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Accept Friend</Button>}
                        {isFriend && <Button onClick={onSendMessage} className={styles.profile_top__content_right_save}>Send message</Button>}
                        {isOutComeRequest && <Button onClick={() => onDeleteFriendRequest(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Delete Request</Button>}
                        {!isFriend && !isCandidate && !isOutComeRequest && <Button onClick={() => onAddFriend(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Add to friends</Button>}
                    </div>}
            </div>
        </div>
    );
};

export default ProfileTop;
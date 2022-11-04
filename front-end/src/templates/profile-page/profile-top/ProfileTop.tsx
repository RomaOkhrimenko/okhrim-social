import React, {FC, useState} from 'react';

import styles from './ProfileTop.module.scss'

import Banner from '../../../assets/images/png/settings-banner.png'
import User from '../../../assets/images/png/settings-man.png'
import Button from "../../../ui/Button";
import {useAppDispatch} from "../../../hooks/redux";
import {addFriend, deleteFriendRequest} from "../../../store/redux/actions/userAction";
import {onAcceptFriendRequest, onAddFriend, onDeleteFriendRequest} from "../../../utils/functions/friends";

interface IProfileTop {
    image: string,
    name: string,
    description: string,
    isMe: boolean,
    isFriend: boolean,
    isCandidate: boolean,
    userId: string,
    friendId: string,
    isOutComeRequest: boolean
}

const ProfileTop: FC<IProfileTop> = ({image, description, name, isMe, isCandidate, isFriend, userId, friendId, isOutComeRequest}) => {
    const [isEdit, setIsEdit] = useState(false)

    const dispatch = useAppDispatch()

    return (
        <div className={styles.profile_top}>
            <img className={styles.profile_top__banner} src={Banner} alt={'settings banner'} />

            <div className={styles.profile_top__content}>
                <div className={styles.profile_top__content_left}>
                    <img src={image ? image : User} alt={`Okhrim social user: ${name}`}/>
                    <div>
                        <h2>{name}</h2>
                        {/*<span>19 years</span>*/}
                        <p>{description}</p>
                    </div>
                </div>
                {isMe ?
                    <div className={styles.profile_top__content_right}>
                        {
                            isEdit
                                ?
                                <>
                                    <Button className={styles.profile_top__content_right_cancel}>Cancel</Button>
                                    <Button onClick={() => setIsEdit(false)} className={styles.profile_top__content_right_save}>Save</Button>
                                </>
                                :
                                <>
                                    <Button onClick={() => setIsEdit(true)} className={styles.profile_top__content_right_save}>Edit</Button>
                                </>

                        }
                    </div>
                    :
                    <div className={styles.profile_top__content_right}>
                        {isCandidate && <Button onClick={() => onAcceptFriendRequest(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Accept Friend</Button>}
                        {isFriend && <Button className={styles.profile_top__content_right_save}>Send message</Button>}
                        {isOutComeRequest && <Button onClick={() => onDeleteFriendRequest(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Delete Request</Button>}
                        {!isFriend && !isCandidate && !isOutComeRequest && <Button onClick={() => onAddFriend(userId, friendId, dispatch)} className={styles.profile_top__content_right_save}>Add to friends</Button>}

                    </div>}
            </div>
        </div>
    );
};

export default ProfileTop;
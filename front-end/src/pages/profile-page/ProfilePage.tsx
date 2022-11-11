import React, {useEffect, useState} from 'react';

import styles from './ProfilePage.module.scss';
import ProfileTop from "../../templates/profile-page/profile-top/ProfileTop";
import ProfileFriends from "../../templates/profile-page/profile-friends/ProfileFriends";
import ProfileGames from "../../templates/profile-page/profile-games/ProfileGames";
import ProfileGenres from "../../templates/profile-page/profile-genres/ProfileGenres";
import ProfilePlatforms from "../../templates/profile-page/profile-platforms/ProfilePlatforms";
import {useAppSelector} from "../../hooks/redux";
import {useParams} from "react-router";
import {useGetAnotherUserQuery} from "../../store/redux/api";
import FindUserBlock from "../../templates/blocks/find-user-block/FindUserBlock";

const ProfilePage = () => {
    const [isMe, setIsMe] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isCandidate, setIsCandidate] = useState(false)
    const [isOutComeRequest, setIsOutComeRequest] = useState(false)
    const user = useAppSelector(state => state.user.user)
    const params = useParams()
    const {data: friend} = useGetAnotherUserQuery({id: params.id!})

    useEffect(() => {
        user._id === params.id ? setIsMe(true) : setIsMe(false)

        const isFriend = user.profile?.friends.friends.find((item) => item.id === params.id)

        if(isFriend) {
            setIsFriend(true)
            return
        } else {
            setIsFriend(false)
        }

        const isCandidate = user.profile?.friends.incomeRequests.find((item) => item.id === params.id)

        if(isCandidate) {
            setIsCandidate(true)
            return
        } else {
            setIsCandidate(false)
        }

        const isOutComeRequest = user.profile?.friends.outcomeRequests.find((item) => item.id === params.id)

        if(isOutComeRequest) {
            setIsOutComeRequest(true)
            return
        } else {
            setIsOutComeRequest(false)
        }
    }, [params.id, user])

    if(!user || !friend) {
        return <div></div>
    }

    if(isMe) {
        return (
            <div className={styles.profile_page}>
                <ProfileTop isMe={isMe} isOutComeRequest={isOutComeRequest} userId={user._id} friendId={params.id!} isFriend={isFriend} isCandidate={isCandidate} image={user.profile?.image!} name={user.profile?.username!} description={user.profile?.description!} />
                <div className={styles.profile_page__container}>
                    <ProfileFriends friends={user.profile?.friends.friends!} />
                    <ProfilePlatforms platforms={user.profile?.platforms!} />
                    <ProfileGames games={user.profile?.games!} />
                    <ProfileGenres genres={user.profile?.genres!} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.profile_page}>
                <ProfileTop isMe={isMe} isOutComeRequest={isOutComeRequest} userId={user._id} friendId={params.id!} isFriend={isFriend} isCandidate={isCandidate} image={friend.profile?.image!} name={friend.profile?.username!} description={friend.profile?.description!} />
                <div className={styles.profile_page__container}>
                    <ProfileFriends friends={friend.profile?.friends.friends!} />
                    <ProfilePlatforms platforms={friend.profile?.platforms!} />
                    <ProfileGames games={friend.profile?.games!} />
                    <ProfileGenres genres={friend.profile?.genres!} />
                </div>

                <FindUserBlock />
            </div>
        );
    }


};

export default ProfilePage;
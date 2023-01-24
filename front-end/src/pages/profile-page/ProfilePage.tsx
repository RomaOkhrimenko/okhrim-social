import React, {useContext, useEffect, useState} from 'react';

import styles from './ProfilePage.module.scss';
import ProfileTop from "../../templates/profile-page/profile-top/ProfileTop";
import ProfileFriends from "../../templates/profile-page/profile-friends/ProfileFriends";
import ProfileGames from "../../templates/profile-page/profile-games/ProfileGames";
import ProfileGenres from "../../templates/profile-page/profile-genres/ProfileGenres";
import ProfilePlatforms from "../../templates/profile-page/profile-platforms/ProfilePlatforms";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useParams} from "react-router";
import {useGetAnotherUserQuery} from "../../store/redux/api";
import FindUserBlock from "../../templates/blocks/find-user-block/FindUserBlock";
import {IPlatform} from "../../models/IPlatform";
import {IGame} from "../../models/IGame";
import {IGenre} from "../../models/IGenre";
import {IUser} from "../../models/IUser";
import {updateUser} from "../../store/redux/actions/userAction";
import {Context} from "../../store/context/context";

const ProfilePage = () => {

    // PAGE STATUS
    const [isMe, setIsMe] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isCandidate, setIsCandidate] = useState(false)
    const [isOutComeRequest, setIsOutComeRequest] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    //----------------
    const [username, setUsername] = useState<string>('')
    const [platforms, setPlatforms] = useState<IPlatform[]>([])
    const [games, setGames] = useState<IGame[]>([])
    const [genres, setGenres] = useState<IGenre[]>([])
    const [image, setImage] = useState<string>('')

    const {setIsFindUsers} = useContext(Context)


    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)

    const params = useParams()
    const {data: friend} = useGetAnotherUserQuery({id: params.id!})

    const onSubmit = async () => {
        const filteredGenres = genres.map(item => item._id)
        const filteredPlatforms = platforms.map(item => item._id)
        const filteredGames = games.map(item => item._id)
        const userEdited: IUser = JSON.parse(JSON.stringify(user))

        if(userEdited.profile) {
            userEdited.profile.username = username
            // @ts-ignore
            userEdited.profile.genres = filteredGenres
            // @ts-ignore
            userEdited.profile.platforms = filteredPlatforms
            // @ts-ignore
            userEdited.profile.games = filteredGames
            // @ts-ignore
            userEdited.profile.image = image
        }

        dispatch(updateUser(userEdited._id, userEdited))
    }

    const onCancel = () => {
        setPlatforms(user.profile?.platforms!)
        setGames(user.profile?.games!)
        setGenres(user.profile?.genres!)
        setUsername(user.profile?.username!)
        setImage(user.profile?.image?.url!)
    }

    // Check Profile Page Status (friends, my profile or another user)
    useEffect(() => {
        user._id === params.id ? setIsMe(true) : setIsMe(false)
        const isFriend = user.profile?.friends.friends.find((item) => item._id === params.id)

        if(isFriend) {
            setIsFriend(true)
            return
        } else {
            setIsFriend(false)
        }

        const isCandidate = user.profile?.friends.incomeRequests.find((item) => item._id === params.id)

        if(isCandidate) {
            setIsCandidate(true)
            return
        } else {
            setIsCandidate(false)
        }

        const isOutComeRequest = user.profile?.friends.outcomeRequests.find((item) => item._id === params.id)

        if(isOutComeRequest) {
            setIsOutComeRequest(true)
            return
        } else {
            setIsOutComeRequest(false)
        }
    }, [params.id, user])

    useEffect(() => {
        if(user) {
            setPlatforms(user.profile?.platforms!)
            setGames(user.profile?.games!)
            setGenres(user.profile?.genres!)
            setUsername(user.profile?.username!)
            setImage(user.profile?.image?.url!)
        }

        if(isMe) {
            setIsFindUsers(false)
        }
    }, [isMe])

    if(!user || !friend) {
        return <div></div>
    }

    if(isMe) {
        return (
            <div className={styles.profile_page}>
                <ProfileTop isMe={isMe} onSave={onSubmit}
                            isOutComeRequest={isOutComeRequest} handleEditStatus={setIsEdit}
                            userId={user._id} friendId={params.id!} isFriend={isFriend}
                            isCandidate={isCandidate} image={image} name={username}
                            description={user.profile?.description!} setUsername={setUsername} onCancel={onCancel} setImage={setImage} />
                <div className={styles.profile_page__container}>
                    <ProfileFriends friends={user.profile?.friends.friends!} />
                    <ProfilePlatforms platforms={platforms} isEdit={isEdit} setPlatforms={setPlatforms} />
                    <ProfileGames games={games} isEdit={isEdit} setGames={setGames} />
                    <ProfileGenres genres={genres} isEdit={isEdit} setGenres={setGenres} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.profile_page}>
                <ProfileTop isMe={isMe} isOutComeRequest={isOutComeRequest} userId={user._id}
                            friendId={params.id!} isFriend={isFriend} isCandidate={isCandidate}
                            image={friend.profile?.image?.url!} name={friend.profile?.username!}
                            description={friend.profile?.description!} />
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
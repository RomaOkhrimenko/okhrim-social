import React, {useEffect, useState} from 'react';
import FriendsHeader from "../../templates/friends-page/friends-header/FriendsHeader";
import FriendsList from "../../templates/friends-page/friends-list/FriendsList";
import {useAppSelector} from "../../hooks/redux";
import {notify} from "../../utils/notification/alerts";
import {instance} from "../../http";
import {IFriends} from "../../models/IFriends";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const FriendsPage = () => {
    const [isFriend, setIsFriend] = useState(true)
    // const [friends, setFriends] = useState<IFriends>()
    const [loading, setLoading] = useState<boolean>(true)
    const friends = useAppSelector(state => state.user.user.profile?.friends)
    // const userId = useAppSelector(state => state.user.user._id)

    // useEffect(() => {
    //     setLoading(true)
    //     const loadFriends = async () => {
    //         try {
    //             const response = await instance.get(`/friends/${userId}`)
    //                 .then(({data}) => data)
    //             console.log(response)
    //             setFriends(response)
    //         } catch (e: any) {
    //             notify('error', `${e.response?.data?.message}`)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     loadFriends()
    // }, [])

    // if(loading) {
    //     return <div></div>
    // }

    return (
        <div>
            <FriendsHeader isFriend={isFriend} friendsCount={friends?.friends.length ? friends?.friends.length : 0} requestFriendsCount={friends?.incomeRequests.length ? friends?.incomeRequests.length : 0} setIsFriend={setIsFriend} />
            <FriendsList isFriend={isFriend} friends={friends!} />
        </div>
    );
};

export default FriendsPage;
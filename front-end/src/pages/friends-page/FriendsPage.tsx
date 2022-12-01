import React, {useState} from 'react';
import FriendsHeader from "../../templates/friends-page/friends-header/FriendsHeader";
import FriendsList from "../../templates/friends-page/friends-list/FriendsList";
import {useAppSelector} from "../../hooks/redux";

const FriendsPage = () => {
    const [isFriend, setIsFriend] = useState(true)
    const friends = useAppSelector(state => state.user.user.profile?.friends)

    return (
        <div>
            <FriendsHeader isFriend={isFriend} friendsCount={friends?.friends.length ? friends?.friends.length : 0} requestFriendsCount={friends?.incomeRequests.length ? friends?.incomeRequests.length : 0} setIsFriend={setIsFriend} />
            <FriendsList isFriend={isFriend} friends={friends!} />
        </div>
    );
};

export default FriendsPage;
import React from 'react';

import styles from './ProfilePage.module.scss'
import ProfileTop from "../../templates/profile-page/profile-top/ProfileTop";
import ProfileFriends from "../../templates/profile-page/profile-friends/ProfileFriends";
import ProfileGames from "../../templates/profile-page/profile-games/ProfileGames";
import ProfileGenres from "../../templates/profile-page/profile-genres/ProfileGenres";
import ProfilePlatforms from "../../templates/profile-page/profile-platforms/ProfilePlatforms";
import {useAppSelector} from "../../hooks/redux";

const ProfilePage = () => {
    const user = useAppSelector(state => state.user.user)

    if(!user) {
        return <div></div>
    }

    return (
        <div className={styles.profile_page}>
            <ProfileTop image={user.profile?.image!} name={user.profile?.username!} description={user.profile?.description!} />
            <div className={styles.profile_page__container}>
                <ProfileFriends friends={user.profile?.friends!} />
                <ProfilePlatforms platforms={user.profile?.platforms!} />
                <ProfileGames games={user.profile?.games!} />
                <ProfileGenres genres={user.profile?.genres!} />
            </div>
        </div>
    );
};

export default ProfilePage;
import React from 'react';

import styles from './ProfilePage.module.scss'
import ProfileTop from "./profile-top/ProfileTop";
import ProfileFriends from "./profile-friends/ProfileFriends";
import ProfileGames from "./profile-games/ProfileGames";
import ProfileGenres from "./profile-genres/ProfileGenres";
import ProfilePlatforms from "./profile-platforms/ProfilePlatforms";

const ProfilePage = () => {
    return (
        <div className={styles.profile_page}>
            <ProfileTop />
            <div className={styles.profile_page__container}>
                <ProfileFriends />
                <ProfilePlatforms />
                <ProfileGames />
                <ProfileGenres />
            </div>
        </div>
    );
};

export default ProfilePage;
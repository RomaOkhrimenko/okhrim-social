import React from 'react';

import styles from './ProfileGenres.module.scss'

const ProfileGenres = () => {
    return (
        <div className={styles.profile_genres}>
            <h3>3 Genres</h3>

            <div className={styles.profile_genres__container}>
                <div className={styles.profile_genres__genre}>
                    Casual
                </div>

                <div className={styles.profile_genres__genre}>
                    Action
                </div>

                <div className={styles.profile_genres__genre}>
                    RPG
                </div>
            </div>
        </div>
    );
};

export default ProfileGenres;
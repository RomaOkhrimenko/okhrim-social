import React from 'react';

import styles from './ProfilePlatforms.module.scss'

const ProfilePlatforms = () => {
    return (
        <div className={styles.profile_platforms}>
            <h3>4 Platforms</h3>

            <div className={styles.profile_platforms__container}>
                <div className={styles.profile_platforms__genre}>
                    Computer
                </div>

                <div className={styles.profile_platforms__genre}>
                    Playstation
                </div>

                <div className={styles.profile_platforms__genre}>
                    Xbox
                </div>

                <div className={styles.profile_platforms__genre}>
                    Mobile
                </div>
            </div>
        </div>
    );
};

export default ProfilePlatforms;
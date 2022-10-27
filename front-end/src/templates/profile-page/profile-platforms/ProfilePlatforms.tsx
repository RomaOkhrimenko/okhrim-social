import React, {FC} from 'react';

import styles from './ProfilePlatforms.module.scss'
import {IPlatform} from "../../../models/IPlatform";

interface IProps {
    platforms: IPlatform[]
}

const ProfilePlatforms: FC<IProps> = ({platforms}) => {
    return (
        <div className={styles.profile_platforms}>
            <h3>{platforms.length} Platforms</h3>

            <div className={styles.profile_platforms__container}>
                {platforms.map((platform) => {
                    return (
                        <div key={platform.slug} className={styles.profile_platforms__genre}>
                            {platform.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProfilePlatforms;
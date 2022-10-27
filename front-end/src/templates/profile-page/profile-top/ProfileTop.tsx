import React, {FC, useState} from 'react';

import styles from './ProfileTop.module.scss'

import Banner from '../../../assets/images/png/settings-banner.png'
import User from '../../../assets/images/png/settings-man.png'
import Button from "../../../ui/Button";

interface IProfileTop {
    image: string,
    name: string,
    description: string,

}

const ProfileTop: FC<IProfileTop> = ({image, description, name}) => {
    const [isMe, setIsMe] = useState(false)

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
                {isMe ? <div className={styles.profile_top__content_right}>
                    <Button className={styles.profile_top__content_right_cancel}>Cancel</Button>
                    <Button className={styles.profile_top__content_right_save}>Save</Button>
                </div> : <div className={styles.profile_top__content_right}>
                    <Button className={styles.profile_top__content_right_save}>Send message</Button>
                </div>}
            </div>
        </div>
    );
};

export default ProfileTop;
import React, {useState} from 'react';

import styles from './ProfileTop.module.scss'

import Banner from '../../../assets/images/png/settings-banner.png'
import User from '../../../assets/images/png/settings-man.png'
import Button from "../../../ui/Button";

const ProfileTop = () => {
    const [isMe, setIsMe] = useState(false)

    return (
        <div className={styles.profile_top}>
            <img className={styles.profile_top__banner} src={Banner} alt={'settings banner'} />

            <div className={styles.profile_top__content}>
                <div className={styles.profile_top__content_left}>
                    <img src={User} alt="Okhrim social User"/>
                    <div>
                        <h2>Xo39NH</h2>
                        {/*<span>19 years</span>*/}
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad doloremque et id inventore placeat quas tempora? Accusamus architecto consequatur dolore eius iusto mollitia officiis optio placeat quaerat voluptatem. A ab amet animi consectetur expedita ipsam laboriosam obcaecati provident reprehenderit vitae.</p>
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
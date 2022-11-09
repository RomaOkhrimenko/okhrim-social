import React, {FC} from 'react';

import Robot from '../../../assets/images/gif/robot.gif'

import styles from './Welcome.module.scss'

const Welcome: FC<{username: string | null}> = ({username}) => {
    return (
        <div className={styles.welcome}>
            <img src={Robot} alt="Welocme" />
            <h1>Welcome, <span>{username}</span></h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
};

export default Welcome;
import React, {useState} from 'react';

import styles from './SettingsForms.module.scss'
import MyDetailsForm from "./my-details-form/MyDetailsForm";

const SettingsForms = () => {
    const [tab, setTab] = useState(1)
    return (
        <div className={styles.settings_forms}>
            <ul className={styles.settings_forms__navigation}>
                <li className={tab === 1 ? styles.active : ''} onClick={() => setTab(1)}>My details</li>
                <li className={tab === 2 ? styles.active : ''} onClick={() => setTab(2)}>Socials</li>
            </ul>

            {tab === 1 && <MyDetailsForm />}
        </div>
    );
};

export default SettingsForms;
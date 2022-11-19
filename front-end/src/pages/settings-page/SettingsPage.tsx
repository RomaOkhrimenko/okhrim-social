import React from 'react';

import styles from './Settings.module.scss'
import SettingsForms from "../../templates/settings-page/settings-forms/SettingsForms";

const SettingsPage = () => {

    return (
        <div className={`${styles.settings_page}`}>
            {/*<ProfileTop />*/}
            <SettingsForms />
        </div>
    );
};

export default SettingsPage;
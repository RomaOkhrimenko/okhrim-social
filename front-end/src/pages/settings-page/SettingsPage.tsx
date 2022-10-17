import React, {useState} from 'react';

import styles from './Settings.module.scss'
import FirstStep from "../../templates/settings-page/first-step/FirstStep";
import SecondStep from "../../templates/settings-page/second-step/SecondStep";
import ThirdStep from "../../templates/settings-page/third-step/ThirdStep";

const SettingsPage = () => {
    const [step, setStep] = useState(1)

    const handleStep = (step: number) => {
        setStep(step)
    }

    return (
        <div className={`${styles.settings_page}`}>
            <div className={styles.settings_page__progressbar} style={{width: `${step * 25}%`}} />
            <div className={`container`}>
                {step === 1 && <FirstStep handleStep={handleStep} />}
                {step === 2 && <SecondStep handleStep={handleStep} />}
                {step === 3 && <ThirdStep handleStep={handleStep} />}

            </div>
        </div>
    );
};

export default SettingsPage;
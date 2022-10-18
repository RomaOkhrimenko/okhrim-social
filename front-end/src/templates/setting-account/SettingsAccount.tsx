import React, {useState} from 'react';

import styles from './Settings.module.scss'
import FirstStep from "./first-step/FirstStep";
import SecondStep from "./second-step/SecondStep";
import ThirdStep from "./third-step/ThirdStep";
import LastStep from "./last-step/LastStep";

const SettingsAccount = () => {
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
                {step === 4 && <LastStep handleStep={handleStep} />}
            </div>
        </div>
    );
};

export default SettingsAccount;
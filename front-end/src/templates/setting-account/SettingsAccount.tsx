import React, {useEffect, useState} from 'react';

import styles from './Settings.module.scss'
import FirstStep from "./first-step/FirstStep";
import SecondStep from "./second-step/SecondStep";
import ThirdStep from "./third-step/ThirdStep";
import LastStep from "./last-step/LastStep";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router";
import {useGetSettingsAccountQuery} from "../../store/redux/api/settingsAccountApi";
import {setUser} from "../../store/redux/slices/userSlice";
import {createProfile} from "../../store/redux/actions/authAction";

const SettingsAccount = () => {
    const [platforms, setPlatforms] = useState<string[]>([])
    const [genres, setGenres] = useState<string[]>([])
    const [games, setGames] = useState<string[]>([])
    const [username, setUsername] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [description, setDescription] = useState('')
    const [step, setStep] = useState(1)

    // @ts-ignore
    const {data} = useGetSettingsAccountQuery()
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleStep = (step: number) => {
        setStep(step)
    }

    const handleLastStepData = (data: {username: string, birthday: string, gender: string, description: string}) => {
        setUsername(data.username)
        setBirthday(data.birthday)
        setGender(data.gender)
        setDescription(data.description)
    }

    const onSubmit = () => {
        const profile = {
            platforms,
            gender,
            genres,
            games,
            username,
            birthday,
            description
        }

        try {
            dispatch(createProfile({id: user.id, profile}))
        } catch {

        }
    }

    useEffect(() => {
        //@ts-ignore
        if(user.profile.isComplete) {
            navigate('/profile')
        }
    }, [user?.profile?.isComplete])

    useEffect(() => {
        if(username) {
            onSubmit()
        }
    }, [username])


    if(!data) {
        return <div></div>
    }

    return (
        <div className={`${styles.settings_page}`}>
            <div className={styles.settings_page__progressbar} style={{width: `${step * 25}%`}} />
            <div className={`container`}>
                {step === 1 && <FirstStep handleStep={handleStep} platforms={data[0].platforms} savePlatforms={setPlatforms} choosePlatforms={platforms} />}
                {step === 2 && <SecondStep handleStep={handleStep} genres={data[0].genres} saveGenres={setGenres} chooseGenres={genres} />}
                {step === 3 && <ThirdStep genres={genres} handleStep={handleStep} saveGames={setGames} chooseGames={games} />}
                {step === 4 && <LastStep handleStep={handleStep} handleData={handleLastStepData} />}
            </div>
        </div>
    );
};

export default SettingsAccount;
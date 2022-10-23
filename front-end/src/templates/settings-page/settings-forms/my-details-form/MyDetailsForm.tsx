import React, {useState} from 'react';

import styles from './MyDetailsForm.module.scss'
import Input from "../../../../ui/Input";

const MyDetailsForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className={styles.my_details_Form}>
            <Input value={username} type={'text'} setValue={setUsername} name={'username'} placeholder={'Username'} />
            <Input value={email} type={'text'} setValue={setEmail} name={'email'} placeholder={'Email'} />
            <Input value={password} type={'text'} setValue={setPassword} name={'password'} placeholder={'Password'} />
        </form>
    );
};

export default MyDetailsForm;
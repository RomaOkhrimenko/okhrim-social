import React, {FC, SetStateAction} from 'react';

interface IInput {
    value: string
    setValue: any
    type?: 'email' | 'text' | 'password' | 'checkbox',
    placeholder?: string,
    register?: any,
    registerOptions?: any,
    name: string,
    className?: string
    isReadOnly?: boolean
}

const Input: FC<IInput> = ({type, placeholder, className, isReadOnly = false, register, name, registerOptions , setValue, value}) => {
    return (
        <>
            {!register && <input type={type} readOnly={isReadOnly} className={className} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />}
            {register && <input type={type} readOnly={isReadOnly} className={className} {...register(name, registerOptions)} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />}
        </>
);
};

export default Input;
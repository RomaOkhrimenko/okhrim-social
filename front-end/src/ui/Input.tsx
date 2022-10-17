import React, {FC, SetStateAction} from 'react';

interface IInput {
    value: string
    setValue: any
    type?: 'email' | 'text' | 'password',
    placeholder?: string,
    register?: any,
    registerOptions?: any,
    name: string,
    className?: string
}

const Input: FC<IInput> = ({type, placeholder, className, register, name, registerOptions , setValue, value}) => {
    return (
        <>
            {!register && <input type={type} className={className} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />}
            {register && <input type={type} className={className} {...register(name, registerOptions)} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />}
        </>
);
};

export default Input;
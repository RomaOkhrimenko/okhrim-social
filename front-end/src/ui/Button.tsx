import React, {FC, ReactNode} from 'react';

interface IButton {
    type?: 'button' | 'submit'
    children: ReactNode
    onClick?: () => void
    className: string
    isDisable?: boolean
}

const Button: FC<IButton> = ({type = 'button', children, onClick, className, isDisable}) => {
    return (
        <button type={type} disabled={isDisable} onClick={onClick} className={className}>{children}</button>
    );
};

export default Button;
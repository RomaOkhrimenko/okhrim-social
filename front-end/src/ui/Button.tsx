import React, {FC, ReactNode} from 'react';

interface IButton {
    type?: 'button' | 'submit'
    children: ReactNode
    onClick?: () => void
    className: string
}

const Button: FC<IButton> = ({type = 'button', children, onClick, className}) => {
    return (
        <button type={type} onClick={onClick} className={className}>{children}</button>
    );
};

export default Button;
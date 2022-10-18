import React, {FC, ReactNode} from 'react';

import styles from './ModalLayout.module.scss'

interface IProps {
    active: boolean,
    setActive: (arg0: boolean) => void
    children: ReactNode
}

const ModalLayout: FC<IProps> = ({children, active, setActive}) => {
    return (
        <div className={`${styles.modal_layout} ${active ? styles.active : ''}`} onClick={() => setActive(false)}>
            <div className={styles.modal_layout__container} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
import React, {FC, ReactNode, useEffect} from 'react';

import styles from './ModalLayout.module.scss'

interface IProps {
    active: boolean,
    setActive: (arg0: boolean) => void
    children: ReactNode
    outsideClick?: boolean,
    isDisableScroll?: boolean
}

const ModalLayout: FC<IProps> = ({children, active, isDisableScroll= true, setActive, outsideClick = true}) => {
    const handleActiveStatus = () => {
        if(outsideClick) {
            setActive(false)
        }
    }

    useEffect(() => {
        if(isDisableScroll) {
            active ? document.body.classList.add('disable-scroll') : document.body.classList.remove('disable-scroll')
        }
    }, [active])
    return (
        <div className={`${styles.modal_layout} ${active ? styles.active : ''}`} onClick={handleActiveStatus}>
            <div className={styles.modal_layout__container} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
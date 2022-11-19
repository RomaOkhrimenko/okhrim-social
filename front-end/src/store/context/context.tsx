import {createContext, FC, ReactNode, useState} from "react";
import {ICurrentChat} from "../../models/ICurrentChat";
import {IContext} from "../../models/IContext";

interface IProps {
    children: ReactNode
}

const ContextProvider: FC<IProps>= ({children}) => {
    const [isFindUsers, setIsFindUsers] = useState<boolean>(false)
    const [currentChatDefault, setCurrentChatDefault] = useState<ICurrentChat>({} as ICurrentChat)

    return (
        <Context.Provider value={{
            isFindUsers,
            setIsFindUsers,
            currentChatDefault,
            setCurrentChatDefault
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export const Context = createContext<IContext>({} as IContext)
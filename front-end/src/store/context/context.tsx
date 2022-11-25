import {createContext, FC, ReactNode, useState} from "react";
import {ICurrentChat} from "../../models/ICurrentChat";
import {IContext} from "../../models/IContext";
import {io} from 'socket.io-client'
import {ICurrentRoom} from "../../models/ICurrentRoom";

interface IProps {
    children: ReactNode
}

const SOCKET_URL = 'http://localhost:4000'
export const socket = io(SOCKET_URL)

const ContextProvider: FC<IProps>= ({children}) => {
    const [isFindUsers, setIsFindUsers] = useState<boolean>(false)
    const [currentChatDefault, setCurrentChatDefault] = useState<ICurrentChat>({} as ICurrentChat)

    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState<ICurrentRoom | null>(null)
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState({})
    const [newMessages, setNewMessages] = useState({})

    return (
        <Context.Provider value={{
            isFindUsers, setIsFindUsers, currentChatDefault,
            setCurrentChatDefault, socket, rooms, setRooms,
            currentRoom, setCurrentRoom, members, setMembers, messages, setMessages,
            privateMemberMsg, setPrivateMemberMsg,
            newMessages, setNewMessages
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export const Context = createContext<IContext>({} as IContext)
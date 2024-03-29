import {createContext, FC, ReactNode, useState} from "react";
import {ICurrentChat} from "../../models/ICurrentChat";
import {IContext} from "../../models/IContext";
import {io} from 'socket.io-client'
import {ICurrentRoom} from "../../models/ICurrentRoom";
import {BASE_URL} from "../../http";

interface IProps {
    children: ReactNode
}

const SOCKET_URL = BASE_URL
export const socket = io(SOCKET_URL)

const ContextProvider: FC<IProps>= ({children}) => {
    const [isFindUsers, setIsFindUsers] = useState<boolean>(false)
    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState<ICurrentRoom | null>(null)
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState({})
    const [newMessages, setNewMessages] = useState({})

    return (
        <Context.Provider value={{
            isFindUsers, setIsFindUsers, socket, rooms, setRooms,
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
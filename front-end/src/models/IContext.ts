import {ICurrentRoom} from "./ICurrentRoom";

export interface IContext {
    isFindUsers: boolean,
    setIsFindUsers: (arg0: boolean) => void
    socket: any,
    rooms: any,
    setRooms: any,
    currentRoom: ICurrentRoom | null,
    setCurrentRoom: any,
    members: any,
    setMembers: any,
    messages: any,
    setMessages: any,
    privateMemberMsg: any,
    setPrivateMemberMsg: any,
    newMessages: any,
    setNewMessages: any,
}
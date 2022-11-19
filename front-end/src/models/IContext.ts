export interface IContext {
    isFindUsers: boolean,
    setIsFindUsers: (arg0: boolean) => void
    currentChatDefault: {id: string, username: string, _id: string, image: string | undefined}
    setCurrentChatDefault: (arg0: { image: string | undefined; id: string; _id: string; username: string }) => void
}
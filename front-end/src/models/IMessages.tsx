export interface IMessages {
    messagesByDate: [
        {
            content: string,
            time: string,
            from: string,
            to: string,
            date: string
        }
    ]
    _id: string
}
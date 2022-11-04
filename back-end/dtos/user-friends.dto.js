module.exports = class userFriendDto {
    incomeRequests;
    friends;

    constructor(model) {
        this.incomeRequests = model.profile.friends.incomeRequests;
        this.friends = model.profile.friends.friends;
    }
}
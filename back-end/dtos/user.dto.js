module.exports = class userFriendsDto {
    email;
    _id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated
    }
}
module.exports = class userFriendsDto {
    email;
    id;
    isActivated;
    profile

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated
        this.profile = model.profile.platforms.length ? model.profile : []
    }
}
module.exports = class userDto {
    email;
    id;
    isActivated;
    profile

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated
        this.profile = model.profile.platforms.length ? model.profile : []
    }
}
user.prototype.toPublicJSON = function () {
    var json = this.toJSON();
    return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
var User = function (firstName, lastName) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
};

User.prototype.getName = function () {
    return this.firstName + ' ' + this.lastName;
};

module.exports = User;

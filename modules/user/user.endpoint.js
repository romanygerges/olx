const { roles } = require("../../middleware/auth");

const endPoint = {
    profile: [roles.Admin,roles.User],
    update: [roles.User]
}

module.exports = {
    endPoint
}
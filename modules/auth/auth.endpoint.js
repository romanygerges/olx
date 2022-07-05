const {roles}  = require('../../middleware/auth')


const endPointuser = {
    deleteUser: [roles.Admin , roles.User ]
}


module.exports = endPointuser
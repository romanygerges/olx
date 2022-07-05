const {roles}  = require('../../middleware/auth')


const endPointProd = {
    addProduct: [roles.User]
}


module.exports = endPointProd
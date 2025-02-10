const jwt = require('jsonwebtoken')
const { jwt_config } = require('../../config/vars');

exports.generateAccessToken = async (admin_check) => {
    const payload = {
        id: admin_check.admin_id,
        email: admin_check.email,
        privilege: admin_check.privilege
    };
    return jwt.sign(payload, jwt_config.jwt_secret, {expiresIn: jwt_config.refresh_token_expiration });
}

exports.generateDeliveryAccessToken = async (delivery_check) => {
    const payload = {
        id: delivery_check.delivery_person_id,
        phone_num: delivery_check.phone_num
    };
    return jwt.sign(payload, jwt_config.jwt_secret, {expiresIn: jwt_config.refresh_token_expiration });
}
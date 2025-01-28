require('dotenv').config();
module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt_config: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiration: process.env.JWT_EXPIRATION,
        refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRATION,
        salt_rounds: process.env.SALT_ROUNDS
    }
}
const JWT = require('jsonwebtoken');

const secret = 'anujSecret';

function createTokenForUser(user){
    const payload = {
        _id: user.id,
        user: user.fullName,
        email: user.email,
        profileImg: user.profileImg,
        role: user.role,
    };

    const token = JWT.sign(payload, secret)
        return token;
    
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}



import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if(!secret){
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export function signToken(payLoad){
    return jwt.sign(payLoad,secret,{
        expiresIn: '1d',
    })
}

export function verifyToken(token){
    try{
        return jwt.verify(token,secret);

    }catch(err){
        console.error("Token verification failed:",err);
        return null;
    }
}
import jwt from 'jsonwebtoken'

export const getSession = (cookie) => {
    let sessionData = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        return (err) ? false : user;
    });

    if (sessionData) return sessionData;

    return false;
}
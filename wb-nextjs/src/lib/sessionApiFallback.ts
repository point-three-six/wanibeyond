import jwt from 'jsonwebtoken'

export const getSession = (cookies) => {
    if ('wp_session' in cookies) {
        let sessionData = jwt.verify(cookies.wp_session, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            return (err) ? false : user;
        });

        if (sessionData) return sessionData;
    }

    return false;
}
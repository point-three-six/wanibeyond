import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'

export const getSession = () => {
    const nxtCookies = cookies();

    if (nxtCookies.has('wp_session')) {
        const cookie = nxtCookies.get('wp_session');

        let sessionData = jwt.verify(cookie.value, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw err;
            return user;
        });

        if (sessionData) return sessionData;
    }

    return false;
}
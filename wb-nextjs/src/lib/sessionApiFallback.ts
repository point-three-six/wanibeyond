import prisma from './prisma'
import jwt from 'jsonwebtoken'

export const getSession = async (cookies) => {
    if ('wp_session' in cookies) {
        let sessionData = jwt.verify(cookies.wp_session, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            let r = await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            });

            if (r) {
                return {
                    id: r?.id,
                    email: r?.email,
                    username: r?.username
                };
            } else {
                return false;
            }

        });

        if (sessionData) return sessionData;
    }

    return false;
}
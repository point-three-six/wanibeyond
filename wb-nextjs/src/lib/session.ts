import { cookies } from 'next/headers';
import prisma from './prisma'
import jwt from 'jsonwebtoken'

export const getSession = async () => {
    const nxtCookies = cookies();

    if (nxtCookies.has('wp_session')) {
        let sessionData = jwt.verify(nxtCookies.get('wp_session').value, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (!err) {
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
                }
            }

            return false;
        });

        if (sessionData) return sessionData;
    }

    return false;
}
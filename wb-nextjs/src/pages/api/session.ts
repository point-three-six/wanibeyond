import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/sessionApiFallback'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req.cookies);

    if (session) {
        res.status(200).json({
            user: {
                id: session.id,
                username: session.username
            }
        });
    } else {
        res.status(200).json({});
    }
}
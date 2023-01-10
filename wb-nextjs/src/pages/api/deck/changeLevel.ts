import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function changeLevel(userId, itemId, deckId, newLevel) {
    let r = await prisma.item.updateMany({
        where: {
            id: itemId,
            deck: {
                id: deckId,
                userId: userId
            }
        },
        data: {
            level: newLevel
        }
    });

    return r.count > 0;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    let data = JSON.parse(req.body);

    if (session) {
        let isChanged = await changeLevel(session.id, data.itemId, data.deckId, data.level);

        if (isChanged) {
            res.status(200).json({});
        } else {
            res.status(422).json({});
        }
    } else {
        res.status(401).json({});
    }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function deleteItem(userId, itemId, deckId) {
    let r = await prisma.item.updateMany({
        where: {
            id: itemId,
            deck: {
                id: deckId,
                userId: userId
            }
        },
        data: {
            deleted: true
        }
    });

    return r.count > 0;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    let data = JSON.parse(req.body);

    if (session) {
        let isDeleted = await deleteItem(session.id, data.itemId, data.deckId);

        if (isDeleted) {
            res.status(200).json({});
        } else {
            res.status(422).json({});
        }
    } else {
        res.status(401).json({});
    }
}
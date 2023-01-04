import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/sessionApiFallback'
import prisma from '../../lib/prisma';
import doStuff from '../../lib/test';

async function getUserDecks(userId) {
    let decks = await prisma.deck.findMany({
        where: {
            userId: userId
        },
        include: {
            items: {
                select: {
                    id: true,
                    data: true,
                    deckId: true,
                    level: true,
                    type: true
                }
            }
        }
    });

    return decks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //doStuff();
    const session = getSession(req.cookies);

    if (session) {
        let myDecks = await getUserDecks(session.id);

        res.status(200).json({
            user: {
                id: session.id,
                username: session.username
            }, data: {
                decks: myDecks
            }
        });
    } else {
        res.status(200).json({});
    }
}
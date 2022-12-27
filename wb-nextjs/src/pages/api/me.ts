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
                    item: true,
                    deckId: true,
                    level: true,
                    lastProgress: true,
                    type: true
                }
            }
        }
    });

    return decks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //doStuff();

    if ('wp_session' in req.cookies) {
        const cookie = req.cookies.wp_session;
        const session = getSession(cookie);
        let myDecks = await getUserDecks(session.id);

        if (session) {
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
    } else {
        res.status(200).json({});
    }
}
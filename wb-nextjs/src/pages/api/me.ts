import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/sessionApiFallback'
import prisma from '../../lib/prisma';
import injectItemData from '../../lib/itemInjector';

async function getUserDecks(userId, ids: number[]) {
    let decks = await prisma.deck.findMany({
        where: {
            id: { in: ids },
        },
        select: {
            id: true,
            name: true,
            threadUrl: true,
            items: {
                where: {
                    deleted: false
                },
                select: {
                    id: true,
                    data: true,
                    en: true,
                    level: true,
                    characters: true,
                    assignment: {
                        where: {
                            user: {
                                id: userId
                            }
                        },
                        select: {
                            stage: true,
                            lastAdvance: true
                        }
                    }
                }
            }
        }
    });

    for (let i = 0; i < decks.length; i++) {
        for (let x = 0; x < decks[i].items.length; x++) {
            let injected = await injectItemData(decks[i].items[x].data);
            decks[i].items[x].data = injected;
        }
    }


    return decks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let body = JSON.parse(req.body);

    const session = await getSession(req.cookies);

    if (session) {
        let myDecks = await getUserDecks(session.id, body.decks);

        res.status(200).json({
            user: {
                id: session.id,
                username: session.username
            }, data: {
                decks: myDecks
            }
        });
    } else {
        let guestDecks = await getUserDecks(-1, body.decks);

        res.status(200).json({
            user: {},
            data: {
                decks: guestDecks
            }
        });
    }
}
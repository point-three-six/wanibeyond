import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/sessionApiFallback'
import prisma from '../../lib/prisma';
import doStuff from '../../lib/test';
import injectItemData from '../../lib/itemInjector';

async function getUserDecks(userId) {
    let decks = await prisma.deck.findMany({
        where: {
            userId: userId
        },
        include: {
            items: {
                // select: {
                //     id: true,
                //     data: true,
                //     deckId: true,
                //     level: true,
                //     type: true
                // },
                where: {
                    deleted: false
                },
                include: {
                    assignment: {
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

async function getGuestDecks(ids: number[]) {
    let decks = await prisma.deck.findMany({
        where: {
            id: { in: ids },
        },
        include: {
            items: true
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
    //doStuff();
    const session = await getSession(req.cookies);

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
        let guestDecks = await getGuestDecks(req.body.decks);

        res.status(200).json(guestDecks);
    }
}
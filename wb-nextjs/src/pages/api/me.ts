import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/sessionApiFallback'
import prisma from '../../lib/prisma';
import injectItemData from '../../lib/itemInjector';

async function getUserDecks(userId: number, ids: number[], initialDownloads: number[], updatedAfter: string) {
    let updatedAfterDate = new Date(updatedAfter);

    // get each deck and the relevant items
    // based on updatedAfter
    let decks = await prisma.deck.findMany({
        where: {
            id: { in: ids },
        },
        select: {
            id: true,
            name: true,
            levelSystem: true,
            items: {
                where: {
                    OR: [
                        {
                            AND: [
                                {
                                    deckId: { in: initialDownloads }
                                },
                                {
                                    deleted: false
                                }
                            ]
                        },
                        {
                            AND: [
                                {
                                    deleted: false
                                },
                                {
                                    updatedAt: {
                                        gte: updatedAfter
                                    }
                                }
                            ]
                        }
                    ]
                },
                select: {
                    id: true,
                    data: true,
                    en: true,
                    level: true,
                    characters: true,
                    updatedAt: true,
                    assignment: {
                        where: {
                            user: {
                                id: userId
                            }
                        },
                        select: {
                            stage: true,
                            completedAt: true
                        },
                        orderBy: [
                            {
                                completedAt: 'desc'
                            }
                        ],
                        take: 1
                    }
                },
                orderBy: [
                    {
                        level: 'asc'
                    },
                    {
                        id: 'asc'
                    }
                ]
            }
        }
    });


    // get the deleted items separately for the deck
    let deleted = [];
    if (updatedAfterDate.getTime() > 0) {
        deleted = await prisma.item.findMany({
            where: {
                AND: [
                    {
                        deckId: { in: ids }
                    },
                    {
                        deleted: true
                    },
                    {
                        updatedAt: {
                            gte: updatedAfter
                        }
                    }
                ]
            },
            select: {
                id: true,
            }
        });
    }

    // inject item references
    for (let i = 0; i < decks.length; i++) {
        for (let x = 0; x < decks[i].items.length; x++) {
            let injected = await injectItemData(decks[i].items[x].data);
            decks[i].items[x].data = injected;
        }
    }

    return {
        decks: decks,
        deleted: deleted
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let body = JSON.parse(req.body);

    const session = await getSession(req.cookies);

    let result = await getUserDecks((session) ? session.id : -1, body.decks, body.initialDownloads, body.updatedAfter);

    let response = {
        user: {},
        data: {
            decks: result.decks,
            deleted: result.deleted
        }
    };

    if (session) {
        response.user.id = session.id;
        response.user.username = session.username;
    }

    res.status(200).json(response);
}
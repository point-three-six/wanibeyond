import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

async function search(type: string, value: string, deckId: number) {
    const nativeItems = await prisma.wkItem.findMany({
        where: {
            OR: [
                {
                    en: {
                        startsWith: value
                    }
                },
                {
                    characters: {
                        startsWith: value
                    }
                }
            ],
            type: {
                equals: type
            }
        },
        select: {
            id: true,
            type: true,
            en: true,
            characters: true
        }
    });

    // mark native item IDs with prefix "wk-"
    for (let i = 0; i < nativeItems.length; i++) {
        let id = nativeItems[i].id;
        nativeItems[i].id = 'wk-' + id;
    }

    const wpItems = await prisma.item.findMany({
        where: {
            deckId: deckId,
            deleted: false,
            OR: [
                {
                    en: {
                        startsWith: value
                    }
                },
                {
                    characters: {
                        startsWith: value
                    }
                }
            ],
            type: {
                equals: type
            }
        },
        select: {
            id: true,
            type: true,
            en: true,
            characters: true
        }
    });

    return nativeItems.concat(wpItems);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const q = req.query.item;
    const type = req.query.type;
    const deckId = parseInt(req.query.deckId);

    if ((q && q.length >= 1) && type && (['vocab', 'radical', 'kanji'].indexOf(type) != -1) && deckId > 0) {
        let result = await search(type, req.query.item, deckId);
        res.status(200).json(result);
    } else {
        res.status(422).json({ e: 'Missing query parameters.' });
    }
}
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

async function search(type: string, value: string) {
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
    return nativeItems;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const q = req.query.item;
    const type = req.query.type;

    if ((q && q.length >= 1) && type && (['vocabulary', 'radical', 'kanji'].indexOf(type) != -1)) {
        let result = await search(type, req.query.item);
        res.status(200).json(result);
    } else {
        res.status(422).json({ e: 'Missing query parameters.' });
    }
}
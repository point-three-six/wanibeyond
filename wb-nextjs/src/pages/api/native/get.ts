import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

async function search(value: string) {
    const nativeItems = await prisma.wkItem.findMany({
        where: {
            en: {
                startsWith: value
            }
        }
    });
    return nativeItems;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const q = req.query.item;

    if (q && q.length >= 2) {
        let result = await search(req.query.item);
        res.status(200).json(result);
    } else {
        res.status(422).json({ e: 'Query must be supplied.' });
    }
}
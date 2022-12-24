import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import prisma from '../../lib/prisma'

async function main() {
    const items = await prisma.item.findMany();
    return items;
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    main().then(r => {
        res.status(200).json(r);
    }).catch(e => {
        console.log(e.message);
    });
}
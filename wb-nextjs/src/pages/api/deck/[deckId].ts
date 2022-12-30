import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

async function getDeck(id) {
    const deck = await prisma.deck.findUnique({
        where: {
            id: id
        }
    });
    return deck;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.deckId);
    let deck = await getDeck(id);
    res.status((deck) ? 200 : 404).json({ deck });
}
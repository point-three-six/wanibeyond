import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function main() {
  const decks = await prisma.deck.findMany();
  return decks;
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  main().then(r => {
    res.status(200).json(r);
  }).catch(e => {
    console.log(e.message);
  });
}
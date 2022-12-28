import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

async function createDeck({ username, password, email }) {
    const passwordHash = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: passwordHash
        }
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    if (data.username.length < 3 || data.username.length > 15) return res.status(422).json({ e: 'Invalid username.' });

}
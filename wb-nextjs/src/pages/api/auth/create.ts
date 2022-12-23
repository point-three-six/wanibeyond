import { NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'email-validator'
import prisma from '../../../lib/prisma';

async function createUser({ username, password, email }) {
    return await prisma.user.create({
        data: {
            email: email,
            username: username
        }
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    if (data.username.length < 3 || data.username.length > 15) return res.status(422).json({ e: 'Invalid username.' });
    if (data.password.length < 3 || data.password.length > 100) return res.status(422).json({ e: 'Invalid password.' });
    if (!validate(data.email)) return res.status(422).json({ e: 'Invalid email.' });

    createUser(data).then((user) => {
        return res.status(200).json({});
    }).catch(e => {
        if (e.code === 'P2002') {
            if (e.meta.target == 'User_email_key') return res.status(422).json({ e: 'E-mail already exists.' });
            if (e.meta.target == 'User_username_key') return res.status(422).json({ e: 'Username already exists.' });
        }
        console.log(e);
        return res.status(422).json({ e: 'Unknown error.' });
    });
}
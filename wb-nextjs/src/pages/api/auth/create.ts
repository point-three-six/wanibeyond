import { NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'email-validator'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function authorize(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.ACCESS_TOKEN_SECRET);
}

async function createUser({ username, password, email }) {
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
    if (data.password.length < 3 || data.password.length > 100) return res.status(422).json({ e: 'Invalid password.' });
    if (!validate(data.email)) return res.status(422).json({ e: 'Invalid email.' });

    createUser(data).then((user) => {
        // sign them in automatically
        let token = authorize(user);

        res.status(200).json({ token: token });
    }).catch(e => {
        if (e.code === 'P2002') {
            if (e.meta.target == 'User_email_key') return res.status(422).json({ e: 'E-mail already exists.' });
            if (e.meta.target == 'User_username_key') return res.status(422).json({ e: 'Username already exists.' });
        }
        res.status(422).json({ e: 'Unknown error.' });
    });

    return;
}
import { NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'email-validator'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verify } from 'crypto'

function authorize(user) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.ACCESS_TOKEN_SECRET);

    return token;
}

async function verifyLogin({ email, password }) {
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        let isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const token = authorize(user);
            return token;
        }
    }

    return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    if (!validate(data.email)) return res.status(422).json({ e: 'Invalid email.' });
    if (data.password.length < 3 || data.password.length > 100) return res.status(422).json({ e: 'Invalid password.' });

    let token = await verifyLogin(data);

    if (token) {
        return res.status(200).json({ token: token });
    } else {
        return res.status(422).json({ e: 'Invalid e-mail or password.' });
    }
}
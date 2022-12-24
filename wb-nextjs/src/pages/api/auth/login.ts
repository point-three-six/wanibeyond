import { NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'email-validator'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function authorize(user) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.ACCESS_TOKEN_SECRET);

    return token;
}

async function verifyLogin({ email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    if (!validate(data.email)) return res.status(422).json({ e: 'Invalid email.' });
    if (data.password.length < 3 || data.password.length > 100) return res.status(422).json({ e: 'Invalid password.' });

    verifyLogin(data).then((token) => {
        console.log(token ? token : 'bad login')

        if (token) {
            return res.status(200).json({ token: token });
        } else {
            return res.status(422).json({ e: 'Invalid e-mail or password.' });
        }
    });
}
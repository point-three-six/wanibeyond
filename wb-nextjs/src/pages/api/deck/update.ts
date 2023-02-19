import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function updateDeck(userId, { id, name, desc, privacy, forking, url, levelSystem }) {
    console.log('updatin g . . .')
    console.log(userId, id);

    return await prisma.deck.updateMany({
        where: {
            AND: [
                {
                    id: id
                },
                {
                    userId: userId
                }
            ]
        },
        data: {
            name: name,
            description: desc,
            isPrivate: privacy,
            allowForks: forking,
            threadUrl: url,
            levelSystem: levelSystem
        }
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    if (session) {
        let data = JSON.parse(req.body);

        console.log(data)

        // validate form data
        if (typeof data.id !== 'number' || data.id <= 0) return res.status(422).json({ e: 'Invalid deck id.' });
        if (data.name.length < 3 || data.name.length >= 45) return res.status(422).json({ e: 'Invalid name.' });
        if (data.desc.length < 0 || data.desc.length >= 300) return res.status(422).json({ e: 'Invalid description.' });
        if (data.privacy !== true && data.privacy !== false) return res.status(422).json({ e: 'Invalid privacy setting.' });
        if (data.forking !== true && data.forking !== false) return res.status(422).json({ e: 'Invalid forking setting.' });
        if (data.threadUrl.length > 0 && validateUrl(data.threadUrl)) return res.status(422).json({ e: 'Invalid thread URL.' });
        if (['wanikani', 'internal'].indexOf(data.levelSystem) == -1) return res.status(422).json({ e: 'Invalid level system.' });

        let r = await updateDeck(session.id, data);
        res.status(200).json({});
    } else {
        res.status(401).json({});
    }
}
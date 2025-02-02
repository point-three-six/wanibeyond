import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function createDeck(userId, { name, desc, privacy, forking, url, levelSystem }) {
    return await prisma.deck.create({
        data: {
            name: name,
            description: desc,
            isPrivate: privacy,
            allowForks: forking,
            threadUrl: url,
            levelSystem: levelSystem,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
}

function validateUrl(value: string) {
    value = value.trim();
    if (value.length == 0) {
        return true;
    } else {
        try {
            let url = new URL(value);
            return url.host == 'community.wanikani.com';
        } catch (e) { }
    }

    return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    if (session) {
        let data = JSON.parse(req.body);

        // validate form data
        if (data.name.length < 3 || data.name.length >= 45) return res.status(422).json({ e: 'Invalid name.' });
        if (data.desc.length < 0 || data.desc.length >= 300) return res.status(422).json({ e: 'Invalid description.' });
        if (data.privacy !== true && data.privacy !== false) return res.status(422).json({ e: 'Invalid privacy setting.' });
        if (data.forking !== true && data.forking !== false) return res.status(422).json({ e: 'Invalid forking setting.' });
        if (data.threadUrl.length > 0 && validateUrl(data.threadUrl)) return res.status(422).json({ e: 'Invalid thread URL.' });
        if (['wanikani', 'internal'].indexOf(data.levelSystem) == -1) return res.status(422).json({ e: 'Invalid level system.' });

        let r = await createDeck(session.id, data);
        res.status(200).json({
            id: r.id
        });
    } else {
        res.status(401).json({});
    }
}
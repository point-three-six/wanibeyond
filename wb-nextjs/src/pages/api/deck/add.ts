import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'
import { Kanji } from '../../../../types';

async function isOwner(userId, deckId) {
    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId: userId
        }
    });
    return deck;
}

({
    "auxiliary_meanings": [],
    "auxiliary_readings": [],
    "relationships": {
        "study_material": null
    }
})

function createKanjiDataObject(kanji: Kanji) {
    let obj = {
        'en': [
            kanji.meaning
        ],
        'id': null,
        'on': kanji.onyomi,
        'kan': kanji.characters,
        'kun': kanji.kunyomi,
        'emph': 'onyomi',
        'mhnt': kanji.meaningHint,
        'mnme': kanji.mmne,
        'rhnt': kanji.readingHint,
        'rmne': kanji.rmne,
        'type': 'Kanji',
        'nanori': [],
        'category': 'Kanji',
        'radicals': kanji.radicals,
        'characters': kanji.characters,
        'vocabulary': kanji.vocabulary,
        'auxiliary_meanings': kanji.auxiliary_meanings,
        'auxiliary_readings': kanji.auxiliary_readings
    };

    return obj;
}

async function addItem(userId, data) {
    let obj;
    if (data.type == 'kanji') obj = createKanjiDataObject(data);

    // insert item, returns it
    let r = await prisma.deck.update({
        where: {
            id: 1,
        },
        data: {
            items: {
                create: {
                    type: data.type,
                    level: data.level,
                    data: '{}'
                }
            }
        },
        select: {
            items: {
                orderBy: {
                    id: 'desc',
                },
                take: 1
            },
        }
    });

    // create data object
    // get created itemId and put it in the data object
    // update item
    let itemId = r.items[0].id;
    obj.id = 'wp-' + itemId;
    r.items[0].data = obj;

    await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            data: obj
        }
    });

    return r.items[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req.cookies);

    if (session) {
        let data = JSON.parse(req.body);

        let r = await addItem(session.id, data);
        res.status(200).json({
            item: r
        });
    } else {
        res.status(401).json({});
    }
}
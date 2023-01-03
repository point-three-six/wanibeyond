import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'
import { Kanji, Vocab } from '../../../../types';

function createVocabDataObject(vocab: Vocab) {
    let sentences = [];

    // build context sentences, if provided
    if (vocab.ctx1.length > 0)
        sentences.push([
            vocab.ctx1jap,
            vocab.ctx1
        ]);

    if (vocab.ctx2.length > 0)
        sentences.push([
            vocab.ctx2jap,
            vocab.ctx2
        ]);

    let obj = {
        'en': vocab.meanings,
        'id': null,
        'aud': vocab.aud,
        'voc': vocab.characters,
        'kana': vocab.kana,
        'kanji': vocab.kanji,
        'mhnt': vocab.meaningHint,
        'mnme': vocab.mmne,
        'rhnt': vocab.readingHint,
        'rmne': vocab.rmne,
        'type': 'Vocabulary',
        'category': 'Vocabulary',
        'characters': vocab.characters,
        'sentences': sentences,
        'collocations': vocab.collocations,
        'parts_of_speech': vocab.parts_of_speech,
        'auxiliary_meanings': vocab.auxiliary_meanings,
        'auxiliary_readings': vocab.auxiliary_readings,
        'relationships': {
            'study_material': null
        }
    };

    return obj;
}

function createKanjiDataObject(kanji: Kanji) {
    let obj = {
        'en': kanji.meanings,
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
        'auxiliary_readings': kanji.auxiliary_readings,
        'relationships': {
            'study_material': null
        }
    };

    return obj;
}

async function addItem(userId, data) {
    let obj;
    if (data.type == 'kanji') obj = createKanjiDataObject(data);
    if (data.type == 'vocab') obj = createVocabDataObject(data);

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
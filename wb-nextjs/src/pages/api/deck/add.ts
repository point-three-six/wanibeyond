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
        'mmne': vocab.mmne,
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
        'mmne': kanji.mmne,
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

async function updateItem(userId, itemId, data) {
    let obj;
    if (data.type == 'kanji') obj = createKanjiDataObject(data);
    if (data.type == 'vocab') obj = createVocabDataObject(data);

    let r = await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            en: data.meanings[0],
            characters: data.characters,
            data: obj
        },
        select: {
            id: true,
            en: true,
            characters: true,
            deckId: true,
            level: true,
            type: true,
            data: true
        }
    });
    return r;
}

async function addItem(userId, deckId, data) {
    let obj;
    if (data.type == 'kanji') obj = createKanjiDataObject(data);
    if (data.type == 'vocab') obj = createVocabDataObject(data);

    // insert item, returns it
    let r = await prisma.deck.update({
        where: {
            id: deckId,
        },
        data: {
            items: {
                create: {
                    type: data.type,
                    level: data.level,
                    data: '{}',
                    en: data.meanings[0],
                    characters: data.characters
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

        if (data.update) {
            console.log('UPDATING')
            let r = await updateItem(session.id, data.update, data.payload);
            res.status(200).json({
                item: r
            });
        } else {
            console.log('INSERTING')
            let r = await addItem(session.id, data.deckId, data.payload);
            res.status(200).json({
                item: r
            });
        }
    } else {
        res.status(401).json({});
    }
}
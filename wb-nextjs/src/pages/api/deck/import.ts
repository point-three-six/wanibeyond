import fs from 'fs';
import formidable from 'formidable';
import { parse } from 'csv-parse';
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback';
import { addItem } from './add';

interface ImportOptions {
    user: number,
    deck: number,
    type: string,
    mappings: object,
    hasHeaderRow: boolean
}

export const config = {
    api: {
        bodyParser: false,
    },
};

async function processFile(filepath: string, data: ImportOptions) {
    console.log('Processing ', filepath)
    console.log('w/ options:')
    console.log(data)
    console.log('========================')

    let startLine = (data.hasHeaderRow) ? 2 : 1;

    // item fields that are arrays, and we should check for
    // commas separted (,) data within the cell
    let arrayFields = ['en', 'onyomi', 'kunyomi', 'kana', 'parts_of_speech'];

    let i = 0;

    fs.createReadStream(filepath)
        .pipe(parse({ delimiter: ",", from_line: startLine }))
        .on('data', function (row) {
            let itemData = {
                'type': data.type
            };

            for (let mapping in data.mappings) {
                let col = data.mappings[mapping];
                let value = row[col];

                if (arrayFields.indexOf(mapping) !== -1) {
                    value = value.split(',');
                }

                itemData[mapping] = value;
            }

            // do some additional data cleanup & formatting if possible
            if ('emph' in itemData) {
                itemData['emph'] = (itemData['emph'].includes('kun')) ? 'kunyomi' : 'onyomi';
            }

            addItem(data.user, data.deck, itemData);
        });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    if (!session) res.status(401).json({});

    const form = new formidable.IncomingForm({
        uploadDir: process.env.USER_UPLOAD_IMPORT_PATH,
        filename: (name, ext, part, form) => {
            return part.originalFilename;
        }
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({ message: `${err}` })
        }

        let data = JSON.parse(fields.data);

        data.user = session.id;
        data.deck = parseInt(data.deck);

        await processFile(files.file.filepath, data);

        res.status(200).json({})
    });
}
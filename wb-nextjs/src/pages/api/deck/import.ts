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

function detectSpecialColumns(columns) {
    let specialColumns = ['waniplus_id', 'waniplus_level', 'waniplus_srs'];
    let detected = columns.filter(col => specialColumns.indexOf(col) !== -1);
    return detected;
}

async function processFile(filepath: string, data: ImportOptions) {
    console.log('Processing ', filepath)

    // item fields that are arrays, and we should check for
    // commas separted (,) data within the cell
    let arrayFields = ['en', 'onyomi', 'kunyomi', 'kana', 'parts_of_speech'];

    let headerRow = [];
    let specialColumns = [];

    let i = 0;

    fs.createReadStream(filepath)
        .pipe(parse({ delimiter: "," }))
        .on('data', function (row) {
            if (i == 0) {
                headerRow = row;
                specialColumns = detectSpecialColumns(row);
            }

            let itemData = {
                'level': 0,
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

            // ADDITIONAL CONDITIONS
            if ('emph' in itemData) {
                itemData['emph'] = (itemData['emph'].includes('kun')) ? 'kunyomi' : 'onyomi';
            }

            // SPECIAL COLUMNS
            let spec_wp_level_idx = headerRow.indexOf('waniplus_level');
            if (spec_wp_level_idx !== -1) {
                let level = parseInt(row[spec_wp_level_idx]);
                if (!level || level < 0 || level > 999) level = 0;
                itemData['level'] = level;
            }

            addItem(data.user, data.deck, itemData);

            i++;
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
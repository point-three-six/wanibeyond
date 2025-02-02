
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import formidable from 'formidable';
import { parse } from 'csv-parse';
import { getSession } from '../../../lib/sessionApiFallback';
import { addItem, updateItem } from './add';

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
        responseLimit: '20mb'
    },
};

function detectSpecialColumns(columns) {
    let specialColumns = ['waniplus_id', 'waniplus_level', 'waniplus_srs'];
    let detected = columns.filter(col => specialColumns.indexOf(col) !== -1);
    return detected;
}

async function processFile(filepath: string, data: ImportOptions) {
    // fields where we want to remove any patterns of (...) or [...]
    let cleanupFields = ['en', 'characters'];

    // item fields that are arrays, and we should check for
    // commas separted (,) data within the cell
    let arrayFields = ['en', 'onyomi', 'kunyomi', 'kana', 'parts_of_speech'];

    const cleanRgx = /\[.*\]|\(.*\)/g;
    const commaRgx = /、|,/;

    let headerRow = [];
    let specialColumns = [];

    // all the promises generated by addItem() and createItem()
    // this will let us know that the import is done
    let dbPromises = [];

    // a list of items that used the waniplus_srs special column
    // and assignments will need to generated
    let assignmentsToCreate = [];

    let i = 0;

    let stream = fs.createReadStream(filepath);

    await new Promise(function (resolve, reject) {
        stream.pipe(parse({ delimiter: "," }))
            .on('data', function (row) {
                if (i == 0) {
                    headerRow = row;
                    specialColumns = detectSpecialColumns(row);
                }

                let wp_id = 0;
                let wp_srs = 0;
                let itemData = {
                    'level': 0,
                    'type': data.type
                };

                for (let mapping in data.mappings) {
                    let col = data.mappings[mapping];
                    let value = row[col].trim();

                    if (cleanupFields.indexOf(mapping) !== -1) {
                        value = value.replaceAll(cleanRgx, '');
                    }

                    if (arrayFields.indexOf(mapping) !== -1) {
                        value = value.split(commaRgx);
                    }

                    if (Array.isArray(value)) {
                        value = value.map(val => val.trim());
                        value = value.filter(val => val.length > 0);
                        // gotta at least have an empty string to satisfy PRISMA's requirements
                        if (value.length == 0) value = [''];
                    } else {
                        value = value.trim();
                    }

                    itemData[mapping] = value;
                }

                // ADDITIONAL CONDITIONS
                if ('emph' in itemData) {
                    itemData['emph'] = (itemData['emph'].includes('kun')) ? 'kunyomi' : 'onyomi';
                }

                // SPECIAL COLUMNS
                let spec_wp_id_idx = headerRow.indexOf('waniplus_id');
                if (spec_wp_id_idx !== -1) {
                    let id = parseInt(row[spec_wp_id_idx]);
                    if (id > 0) wp_id = id;
                }

                let spec_wp_level_idx = headerRow.indexOf('waniplus_level');
                if (spec_wp_level_idx !== -1) {
                    let level = parseInt(row[spec_wp_level_idx]);
                    if (!level || level < 0 || level > 999) level = 0;
                    itemData['level'] = level;
                }

                let spec_wp_srs_idx = headerRow.indexOf('waniplus_srs');
                if (spec_wp_srs_idx !== -1) {
                    let srs = parseInt(row[spec_wp_srs_idx]);
                    if (srs >= 1 && srs <= 9) wp_srs = srs;
                }

                // update or create
                if (wp_id > 0) {
                    let prom = updateItem(data.user, wp_id, itemData, wp_srs);
                    dbPromises.push(prom);
                } else {
                    let prom = addItem(data.user, data.deck, itemData, wp_srs);
                    dbPromises.push(prom);
                }

                i++;
            })
            .on('end', () => {
                resolve(true);
            })
    });

    // now wait for all dbPromises from the initial addItem() and updateItem() calls
    await Promise.all(dbPromises);

    return;
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
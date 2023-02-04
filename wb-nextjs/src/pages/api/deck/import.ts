import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import fs from 'fs';
import { getSession } from '../../../lib/sessionApiFallback';

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${process.env.IMPORT_PATH}/${file.name}`, data);
    await fs.unlinkSync(file.filepath);
    return;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    const form = new formidable.IncomingForm();
    await form.parse(req, async function (err, fields, files) {
        await saveFile(files.file);
    });

    if (session) {
        res.status(200).json({});
    } else {
        res.status(200).json({});
    }
}
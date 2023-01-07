import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('item success')
    console.log(req);
    res.status(200).send({});
}
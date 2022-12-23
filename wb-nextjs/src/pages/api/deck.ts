import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    console.log(req.query)
    console.log(req.cookies)
    res.end(`Get deck: ${id}`)
  }
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function getAssignment(userId, itemId) {
    return await prisma.assignment.findFirst({
        where: {
            itemId: itemId,
            userId: userId
        },
        orderBy: [
            {
                completedAt: 'desc'
            }
        ]
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req.cookies);

    if (session) {
        let completions = [];
        let data = JSON.parse(req.body);

        // ids come in the "wk-###" id format
        // so we need to convert
        for (let completion of data) {
            let id = completion[0];
            let numerical = parseInt(id.substring(3, id.length));
            completions.push([numerical, completion[1]]);
        }

        // now update assignments for each ID
        for (let completion of completions) {
            let id = completion[0];
            let failed = completion[1];
            let lastAssignment = await getAssignment(session.id, id);

            let curStage = 1;

            if (lastAssignment) {
                let lastStage = lastAssignment.stage;
                curStage = lastStage;

                if (failed && lastStage > 1) {
                    curStage--;
                } else if (!failed && lastStage < 8) {
                    curStage++;
                }
            }

            // create new assignment record
            await prisma.assignment.create({
                data: {
                    user: {
                        connect: {
                            id: session.id
                        }
                    },
                    item: {
                        connect: {
                            id: id
                        }
                    },
                    wasCorrect: !failed,
                    stage: curStage
                }
            });
        };

        res.status(200).send({});
    } else {
        res.status(403).send({});
    }
}
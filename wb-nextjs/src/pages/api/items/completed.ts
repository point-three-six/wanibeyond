import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function getAssignment(userId, itemId) {
    return await prisma.assignment.findFirst({
        where: {
            itemId: itemId,
            userId: userId
        }
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
            let assignment = await getAssignment(session.id, id);

            if (!assignment) {
                let newAssignment = await prisma.assignment.create({
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
                        lastAdvance: new Date().toISOString()
                    }
                });
            } else {
                let curStage = assignment.stage;
                let newStage = curStage;

                if (failed && curStage > 0) {
                    newStage--;
                } else if (!failed && curStage < 8) {
                    newStage++;
                }

                let updatedAssignment = await prisma.assignment.updateMany({
                    where: {
                        itemId: id,
                        userId: session.id
                    },
                    data: {
                        stage: newStage,
                        lastAdvance: new Date().toISOString(),
                    }
                });
            }
        };

        res.status(200).send({});
    } else {
        res.status(403).send({});
    }
}
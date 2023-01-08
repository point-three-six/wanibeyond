import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../../lib/sessionApiFallback'
import prisma from '../../../lib/prisma'

async function getAssignment(userId, itemId) {
    const assignment = await prisma.assignment.findFirst({
        where: {
            id: itemId,
            userId: userId
        }
    });
    return assignment;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req.cookies);

    if (session) {
        let ids = [];
        let data = JSON.parse(req.body);

        // ids come in the "wk-###" id format
        // so we need to convert
        for (let id of data) {
            let numerical = parseInt(id.substring(3, id.length));
            ids.push(numerical);
        }

        // now update assignments for each ID
        for (let id of ids) {
            let assignment = await getAssignment(session.id, id);

            console.log(assignment)

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
                        lastAdvance: new Date()
                    }
                });
                console.log('created')
                console.log(newAssignment)
            } else {
                let newStage = assignment.stage + 1;
                if (newStage < 8) {
                    let updatedAssignment = await prisma.assignment.update({
                        where: {
                            id: id
                        },
                        data: {
                            stage: newStage
                        }
                    });
                }
            }
        };

        res.status(200).send({});
    } else {
        res.status(403).send({});
    }
}
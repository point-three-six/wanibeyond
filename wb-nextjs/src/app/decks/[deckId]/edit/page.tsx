import React from 'react'
import ItemEditor from './ItemEditor';
import prisma from '../../../../lib/prisma';
import { getSession } from '../../../../lib/session'

async function getDeckData(deckId, userId) {
    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId: userId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            },
            items: {
                where: {
                    deleted: false,
                },
                select: {
                    id: true,
                    data: true,
                    level: true,
                    type: true
                }
            }
        }
    });
    return deck;
}

export default async function EditDeckPage({ params: { deckId } }) {
    let id = parseInt(deckId);
    let sessionData = await getSession();
    let deckData = {};

    if (sessionData) {
        deckData = await getDeckData(id, sessionData.id);
    }

    return (
        <div>
            {
                deckData && Object.keys(deckData).length > 0 ?
                    <ItemEditor deck={deckData} /> : 'There was an error.'
            }
        </div >
    )
}

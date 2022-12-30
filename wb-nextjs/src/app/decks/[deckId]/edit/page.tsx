import React from 'react'
import ItemEditor from './ItemEditor';
import { getSession } from '../../../../lib/session'

async function getDeckData(id) {
    // get deck data
    // get item data
    return { 'item': id };
}

export default async function EditDeckPage({ params: { deckId } }) {
    let id = parseInt(deckId);
    let sessionData = await getSession();
    let deckData = {};

    if (sessionData) {
        deckData = await getDeckData(id);
    }

    return (
        <div>
            {
                Object.keys(deckData).length > 0 ?
                    <ItemEditor deck={deckData} /> : 'There was an error.'
            }
        </div >
    )
}

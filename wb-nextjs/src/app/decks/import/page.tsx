import prisma from '../../../lib/prisma';
import ImportForm from './ImportForm';
import { getSession } from '../../../lib/session';

export default async function page() {
    let sessionData = await getSession();

    let myDecks;
    if (sessionData) {
        myDecks = await prisma.deck.findMany({
            where: {
                userId: sessionData.id
            }
        });
    }

    return (
        <div>
            <div className='w-screen max-width flex justify-center gap-7'>
                <div className='w-3/4'>
                    <h3 className='text-2xl font-bold text-slate-700'>Import Items</h3>
                    <hr className='mb-3 mt-3' />
                    {
                        sessionData ? <ImportForm decks={myDecks}></ImportForm> : 'You are not authorized for this action.'
                    }
                </div>
            </div>
        </div >
    )
}

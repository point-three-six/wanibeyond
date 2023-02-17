import prisma from '../../lib/prisma';
import ImportForm from './ImportForm';
import { getSession } from '../../lib/session';

export default async function page() {
    let sessionData = await getSession();

    let myDecks;
    if (sessionData) {
        myDecks = await prisma.deck.findMany({
            where: {
                userId: sessionData.id
            },
            select: {
                id: true,
                name: true
            }
        });
    }

    return (
        <div>
            <div className='w-screen max-width flex justify-center gap-7'>
                <div className='w-3/4'>
                    <h1 className="text-3xl font-extrabold text-slate-700 dark:text-inherit mb-6">Import</h1>
                    {
                        sessionData ? <ImportForm decks={myDecks}></ImportForm> : 'You are not authorized for this action.'
                    }
                </div>
            </div>
        </div >
    )
}

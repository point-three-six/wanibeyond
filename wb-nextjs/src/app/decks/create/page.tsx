import Link from 'next/link'
import CreateForm from './CreateForm'
import { getSession } from '../../../lib/session';
import { RefreshPage } from '../../components/RefreshPage';

export default async function DeckListPage() {
    let sessionData = await getSession();

    return (
        <div>
            <RefreshPage />
            <div className='w-screen max-width flex justify-center gap-7'>
                <div className='w-3/4'>
                    <h3 className='text-2xl font-bold text-slate-700 pb-3 mb-3 border-b border-solid border-neutral-400 dark:border-neutral-700 dark:text-inherit'>Create a Deck</h3>
                    {
                        sessionData ? <CreateForm></CreateForm> :
                            <>
                                Please <Link href='/signin' className='text-slate-500 font-bold'>sign in</Link> or <Link href='/signup' className='text-slate-500 font-bold'>create an account</Link> to create a deck.
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

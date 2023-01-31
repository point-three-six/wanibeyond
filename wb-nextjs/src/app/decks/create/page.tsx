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
                    <h3 className='text-2xl font-bold text-slate-700'>Create a Deck</h3>
                    <hr className='mb-3 mt-3' />
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

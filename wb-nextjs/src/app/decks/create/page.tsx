import React from 'react'
import CreateForm from './CreateForm'

export default function DeckListPage() {
    return (
        <div>
            <div className='w-screen max-width flex justify-between gap-7'>
                <div className='w-1/4'>
                    <div className='text-sm font-medium text-gray-700 mb-2'>
                        Info
                    </div>
                    <div className='mb-2'>
                        By creating a deck, you can instantly import it straight into WaniKani for use. If you choose, others can import your deck too!
                    </div>
                </div>
                <div className='w-3/4'>
                    <h3 className='text-2xl font-bold text-slate-700'>Create a Deck</h3>
                    <hr className='mb-3 mt-3' />
                    <CreateForm></CreateForm>
                </div>
            </div>
        </div >
    )
}

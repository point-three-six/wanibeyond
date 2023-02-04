import React from 'react'
import Link from 'next/link'
import { getSession } from '../../lib/session'

export default async function UserInfoBar() {
    let sessionData = await getSession();

    return (
        <div className='flex-grow text-right px-2 py-1 text-white'>
            <div className='inline-block nav-dropdown'>
                {
                    Object.keys(sessionData).length > 0 ?
                        <>
                            {sessionData.username}
                            <div className='nav-dropdown-content bg-white dark:bg-neutral-900 font-bold'>
                                <div className='entry p-2 text-left text-slate-800 dark:text-inherit hover:bg-slate-100 dark:hover:bg-neutral-700'>
                                    <Link href='/decks/me' className='px-2 py-1'>My Decks</Link>
                                </div>
                                {/* <div className='entry p-2 text-left text-slate-800 hover:bg-slate-100'>
                                    <Link href='/decks/create' className='px-2 py-1'>Create Deck</Link>
                                </div> */}
                                {/* <div className='entry p-2 text-left text-slate-800 dark:text-inherit hover:bg-slate-100 dark:hover:bg-neutral-700'>
                                    <Link href='/decks/import' className='px-2 py-1'>Import</Link>
                                </div> */}
                                <div className='entry p-2 text-left text-slate-800 dark:text-inherit hover:bg-slate-100 dark:hover:bg-neutral-700'>
                                    <Link href='/signout' className='px-2 py-1'>Sign Out</Link>
                                </div>
                            </div>
                        </> :
                        <Link href='/signin' className='px-2 py-1 text-white '>Sign In</Link>
                }
            </div>
        </div>
    )
}
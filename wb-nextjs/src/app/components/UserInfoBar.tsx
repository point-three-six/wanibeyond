import React from 'react'
import Link from 'next/link'
import { getSession } from '../../lib/session'

export default async function UserInfoBar() {
    let sessionData = await getSession();

    return (
        <div className="flex-grow text-right px-2 py-1 text-white">
            {Object.keys(sessionData).length > 0 ?
                sessionData.username :
                <Link href="/signin" className='px-2 py-1 text-white '>Sign In</Link>}
        </div>
    )
}
import React from 'react'
import Link from 'next/link'
import { isLoggedIn } from '../../lib/session'

export default async function UserInfoBar() {
    const loggedIn: boolean = await isLoggedIn()

    return (
        <div className="flex-grow text-right px-2 py-1 text-white">
            {loggedIn ?
                'hi' :
                <Link href="/signin" className='px-2 py-1 text-white '>Sign In</Link>}
        </div>
    )
}

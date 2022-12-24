import React from 'react'
import Link from 'next/link'
import { getSession } from '../../lib/session'

export default async function UserInfoBar() {
    let sessionData = getSession();

    console.log(sessionData)

    return (
        <div className="flex-grow text-right px-2 py-1 text-white">
            {sessionData ?
                'hi' :
                <Link href="/signin" className='px-2 py-1 text-white '>Sign In</Link>}
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}
'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import sendExtMsg from '../../lib/wpExtension';

export default function page() {
    const router = useRouter();

    useEffect(() => {
        deleteCookie('wp_session', {
            path: '/',
            sameSite: 'lax'
        });

        // if they have the extension installed
        // tell it to sync
        sendExtMsg('sync', true, () => { });

        router.refresh();
        router.push('/');
    }, []);

    return (
        <>
            <div className='max-width'>
                <div className='text-center'>
                    Signing out of WaniPlus . . .
                </div>
            </div>
        </>
    )
}

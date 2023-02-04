'use client';

import Link from 'next/link';
import React from 'react'


export default function DeckDetails(props) {
    return (
        <>
            <div className='text-base w-full'>
                <div className='font-medium text-gray-700 dark:text-inherit'>
                    <div>{props.deck.name}</div>
                </div>
                <div className='flex justify-between dark:text-inherit'>
                    <div>Privacy</div>
                    <div>{props.deck.isPrivate ? 'Unlisted' : 'Listed'}</div>
                </div>
                <div className='flex justify-between dark:text-inherit'>
                    <div>Forking</div>
                    <div>{props.deck.allowForks ? 'Yes' : 'No'}</div>
                </div>
                <div className='flex justify-between dark:text-inherit'>
                    <div>Level System</div>
                    <div>{props.deck.levelSystem}</div>
                </div>
                <div>
                    <Link href={`/decks/${props.deck.id}`} className='text-orange-500'>View preview</Link>
                </div>
            </div >
        </>
    )
}
'use client';

import React from 'react'

export default function DeckDetails(props) {
    return (
        <>
            <div className='text-base w-full'>
                <div className='font-medium text-gray-700'>
                    <div>{props.deck.name}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Privacy</div>
                    <div>{props.deck.isPrivate ? 'Unlisted' : 'Listed'}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Forking</div>
                    <div>{props.deck.allowForks ? 'Yes' : 'No'}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Level System</div>
                    <div>{props.deck.levelSystem}</div>
                </div>
            </div >
        </>
    )
}
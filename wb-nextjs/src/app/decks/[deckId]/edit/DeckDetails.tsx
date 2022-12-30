'use client';

import React from 'react'

export default function DeckDetails(props) {
    return (
        <>
            <div className='text-base'>
                <div className='flex justify-between'>
                    <div>Name</div>
                    <div>{props.deck.name}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Author</div>
                    <div>{props.deck.user.username}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Privacy</div>
                    <div>{props.deck.isPrivate ? 'Unlisted' : 'Listed'}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Forking</div>
                    <div>{props.deck.allowForks ? 'Yes' : 'No'}</div>
                </div>
            </div >
        </>
    )
}
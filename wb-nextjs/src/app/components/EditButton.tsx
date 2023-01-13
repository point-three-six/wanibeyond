'use client';

import React, { useState } from 'react';

export default function InstallButton(props) {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
            <button
                id='edit'
                onClick={() => { }}
                className={`${isHidden ? 'hidden' : ''} uppercase bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border-b-4 border-gray-300 hover:border-gray-400`}
            >
                Edit
            </button>
        </>
    )
}

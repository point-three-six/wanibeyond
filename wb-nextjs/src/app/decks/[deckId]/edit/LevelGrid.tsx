'use client';

import React from 'react'

export default function LevelGrid() {
    return (
        <>
            <div className="level-grid grid grid-cols-8 gap-2">
                {[...Array(35)].map((x, i) =>
                    <div className='level-grid-item'>{i}</div>
                )}
            </div>
        </>
    )
}
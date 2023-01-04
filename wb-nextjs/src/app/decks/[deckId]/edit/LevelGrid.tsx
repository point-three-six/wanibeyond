'use client';

import React from 'react'

export default function LevelGrid(props) {
    return (
        <>
            <div className="level-grid grid grid-cols-8 gap-2">
                {props.levels.map((x) =>
                    <div key={x} className='level-grid-item'>{x}</div>
                )}
            </div>
        </>
    )
}
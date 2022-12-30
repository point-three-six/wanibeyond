'use client';

import React, { useEffect, useState, useRef } from 'react'
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import '../../../../styles/editor.css';

export default function ItemEditor(props) {

    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };


    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };

    return (
        <div className="editor max-width" >
            <div className='w-screen max-width flex justify-between gap-7'>
                <div className='w-1/4'>
                    <div className='text-sm font-medium text-gray-700 mb-2'>
                        Details
                    </div>
                    <DeckDetails />
                    <div className='text-sm font-medium text-gray-700 mt-6 mb-2'>
                        Levels
                    </div>
                    <LevelGrid />
                </div>
                <div className='w-3/4'>
                    <div className='flex items-center'>
                        <div className='flex-grow h-px bg-gray-400'></div>
                        <span className='flex-shrink text-lg text-slate-500 px-4 font-light'>Level 1</span>
                        <div className='flex-grow h-px bg-gray-400'></div>
                    </div>
                    <div className='item kanji'>
                        和足
                    </div>
                    <div className='flex items-center'>
                        <div className='flex-grow h-px bg-gray-400'></div>
                        <span className='flex-shrink text-lg text-slate-500 px-4 font-light'>Level 4</span>
                        <div className='flex-grow h-px bg-gray-400'></div>
                    </div>
                    <div className='item vocab'>
                        和足
                    </div>
                </div>
            </div>
            {/* {
                list &&
                list.map((item, index) => (
                    <div style={{ backgroundColor: 'lightblue', margin: '20px 25%', textAlign: 'center', fontSize: '40px' }}
                        key={index}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        draggable>
                        {item}
                    </div>
                ))} */}
        </div >
    )
}

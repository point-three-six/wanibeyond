'use client';

import React, { useEffect, useState, useRef } from 'react'
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import '../../../../styles/editor.css';
import { getDisplayName } from 'next/dist/shared/lib/utils';

function getItemTitle(item) {
    if (item.type == 'radical') return item.data.rad;
    if (item.type == 'kanji') return item.data.kan;
    if (item.type == 'vocab') return item.data.voc;
    return '';
}

export default function ItemEditor(props) {
    const deck = props.deck;
    let levels = [];

    deck.items.forEach(item => {
        const level = item.level;
        if (levels.indexOf(level) == -1) levels.push(level)
    });

    levels.sort(function (a, b) {
        return a - b;
    });

    let [filter, setFilter] = useState('');
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    function updateFilter(value) {
        setFilter(value);
    }

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
                    <div className='font-medium text-gray-700 mb-2'>
                        Filter
                    </div>
                    <input type='text' onChange={e => updateFilter(e.target.value)} />
                    <div className='font-medium text-gray-700 mt-6 mb-2'>
                        Details
                    </div>
                    <DeckDetails deck={deck} />
                    <div className='font-medium text-gray-700 mt-6 mb-2'>
                        Levels
                    </div>
                    <LevelGrid />
                </div>
                <div className='w-3/4'>
                    {
                        levels.map(level =>
                            <div key={level}>
                                <div className='flex items-center'>
                                    <div className='flex-grow h-px bg-gray-400'></div>
                                    <span className='flex-shrink text-lg text-slate-500 px-4 font-light'>
                                        {level == 0 ? 'Any level' : `Level ${level}`}
                                    </span>
                                    <div className='flex-grow h-px bg-gray-400'></div>
                                </div>
                                <div className='items flex gap-2'>
                                    {deck.items
                                        .filter(item => item.level == level)
                                        .filter(item => item.data.en[0].toLowerCase().indexOf(filter.toLowerCase()) != -1)
                                        .map(item =>
                                            <div key={item.id} className={`item ${item.type}`}>
                                                {getItemTitle(item)}
                                                <div className='meaning text-xs'>
                                                    {item.data.en[0]}
                                                </div>
                                            </div>
                                        )}
                                    <div className='item add' onClick={(e) => alert(`add ${level}`)}>
                                        +
                                        <div className='meaning text-xs'>
                                            add item
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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

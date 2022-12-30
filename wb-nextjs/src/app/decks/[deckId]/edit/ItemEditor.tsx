'use client';

import React, { useEffect, useState, useRef } from 'react'
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import '../../../../styles/editor.css';
import AddItem from './AddItem';
import LevelList from './LevelList';

export default function ItemEditor(props) {
    const deck = props.deck;
    let levels = [0];

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

    let [isAddingItem, setIsAddingItem] = useState(-1);

    function updateFilter(value) {
        setFilter(value);
    }

    function handleAddItem(level) {
        setIsAddingItem(level);
    }

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
                        isAddingItem > -1 ?
                            <AddItem level={isAddingItem} /> :
                            <LevelList deck={deck} levels={levels} filter={filter} onAddItem={handleAddItem} />
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

'use client';

import React, { useEffect, useState, useRef } from 'react'
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import '../../../../styles/editor.css';
import AddItem from './AddItem';
import LevelList from './LevelList';

export default function ItemEditor(props) {
    const [deck, setDeck] = useState(props.deck);

    let levels = [0];

    deck.items.forEach(item => {
        const level = item.level;
        if (levels.indexOf(level) == -1) levels.push(level)
    });

    levels.sort(function (a, b) {
        return a - b;
    });

    let [filter, setFilter] = useState('');
    let [itemEditing, setItemEditing] = useState({});

    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    // the VALUE of this will indicate the LEVEL
    // and item is currently being added to.
    // if equals == -1, we are not adding an item.
    // therefore the entire deck screen is shown.
    let [isAddingItem, setIsAddingItem] = useState(-1);

    function updateFilter(value) {
        setFilter(value);
    }

    function handleAddItem(level) {
        setIsAddingItem(level);
    }

    function handleEditItem(itemId) {
        let item = getItemById(itemId);
        setItemEditing(item);
        setIsAddingItem(item.level);
    }

    function handleOnItemAdded(data) {
        let updatedDeck = deck;
        deck.items.push(data);
        setDeck(updatedDeck);
    }

    function handleOnItemEdited(data) {
        let updatedDeck = deck;
        for (let i = 0; i < updatedDeck.items.length; i++) {
            if (updatedDeck.items[i].id == data.id) {
                updatedDeck.items[i] = data;
            }
        }
        setDeck(updatedDeck);
    }

    function getItemById(id) {
        for (let item of deck.items) {
            if (item.id == id) return item;
        }
        return false;
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
                            <AddItem back={() => {
                                setIsAddingItem(-1)
                                setItemEditing({})
                            }} item={itemEditing} level={isAddingItem} deckId={deck.id} onItemAdded={handleOnItemAdded} onItemEdited={handleOnItemEdited} /> :
                            <LevelList deck={deck} levels={levels} filter={filter} onAddItem={handleAddItem} onItemClick={handleEditItem} />
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

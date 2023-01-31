'use client';

import React, { useEffect, useState, useRef } from 'react'
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import '../../../../styles/editor.css';
import AddItem from './AddItem';
import LevelList from './LevelList';
import Script from 'next/script'
import InstallButton from '../../../components/InstallButton';

export default function ItemEditor(props) {
    const generateLevels = (items) => {
        let lvls = items.map(item => item.level)
            .filter((e, i, arr) => arr.indexOf(e) === i)
            .sort((a, b) => a - b)
        return (lvls.length > 0) ? lvls : [0];
    }

    const [deck, setDeck] = useState(props.deck);
    const [levels, setLevels] = useState(generateLevels(deck.items));

    let [filter, setFilter] = useState('');
    let [itemEditing, setItemEditing] = useState({});

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
        deck.items.push(data);
        setDeck(deck);
        setLevels(generateLevels(deck.items));
    }

    function handleOnItemEdited(data) {
        for (let i = 0; i < deck.items.length; i++) {
            if (deck.items[i].id == data.id) {
                deck.items[i] = data;

                //check to see if a new level was created
                if (levels.indexOf(data.level) == -1) {
                    setLevels(generateLevels(deck.items));
                }
            }
        }
        setDeck(deck);
    }

    function getItemById(id) {
        for (let item of deck.items) {
            if (item.id == id) return item;
        }
        return false;
    }

    function handleOnItemLevelChange(item, newLevel) {
        for (let i = 0; i < deck.items.length; i++) {
            if (deck.items[i].id == item.id) {
                deck.items[i].level = newLevel;
            }
        }

        // force redraw of the LevelList
        setLevels([...levels]);
    }

    function handleOnItemDeleted(deletedItem) {
        deck.items = deck.items.filter(item => item.id != deletedItem.id);
        setDeck(deck);
        setLevels(generateLevels(deck.items));
    }

    return (
        <div className="editor flex justify-center max-width" >
            <Script
                src="/wanakana.js"
                strategy="lazyOnload"
            />
            <div className='md:flex max-width'>
                <div className='mr-5 mb-4 w-64'>
                    <DeckDetails deck={deck} />
                </div>
                <div className='flex-grow'>
                    {
                        isAddingItem > -1 ?
                            <AddItem
                                back={() => {
                                    setIsAddingItem(-1)
                                    setItemEditing({})
                                }}
                                item={itemEditing}
                                level={isAddingItem}
                                deckId={deck.id}
                                onItemAdded={handleOnItemAdded}
                                onItemEdited={handleOnItemEdited}
                                onItemDeleted={handleOnItemDeleted}
                            /> :
                            <LevelList
                                deck={deck}
                                levels={levels}
                                filter={filter}
                                onAddItem={handleAddItem}
                                onItemClick={handleEditItem}
                                onItemLevelChange={handleOnItemLevelChange} />
                    }
                </div>
            </div>
        </div >
    )
}

'use client';

import React, { useEffect, useState, useRef } from 'react'
import '../../../../styles/editor.css';
import LevelGrid from './LevelGrid';
import DeckDetails from './DeckDetails';
import AddItem from './AddItem';
import LevelList from './LevelList';
import Script from 'next/script';
import DetailEditor from './DetailEditor';
import sendExtMsg from '../../../../lib/wpExtension';

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
    let [isEditingDeckDetails, setIsEditingDeckDetails] = useState(false);

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
        sendExtMsg('sync', true, () => { });
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
        sendExtMsg('sync', true, () => { });
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
        sendExtMsg('sync', true, () => { });
    }

    function handleOnItemDeleted(deletedItem) {
        deck.items = deck.items.filter(item => item.id != deletedItem.id);
        setDeck(deck);
        setLevels(generateLevels(deck.items));
        sendExtMsg('sync', true, () => { });
    }

    function handleDeckUpdated(details) {
        deck.name = details.name;
        deck.description = details.desc;
        deck.isPrivate = details.privacy;
        deck.allowForks = details.forking;
        deck.levelSystem = details.levelSystem;
        setDeck(deck);
        sendExtMsg('sync', true, () => { });
    }

    function getDisplayedComponent() {
        if (isEditingDeckDetails) {
            return (
                <DetailEditor
                    deck={deck}
                    onUpdated={handleDeckUpdated}
                    onBack={() => setIsEditingDeckDetails(false)}
                />
            );
        } else if (isAddingItem > -1) {
            return (
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
                />
            );
        } else {
            return (
                <LevelList
                    deck={deck}
                    levels={levels}
                    filter={filter}
                    onAddItem={handleAddItem}
                    onItemClick={handleEditItem}
                    onItemLevelChange={handleOnItemLevelChange} />
            );
        }
    }

    return (
        <div className="editor flex justify-center max-width" >
            <Script
                src="/wanakana.js"
                strategy="lazyOnload"
            />
            <div className='md:flex max-width'>
                <div className='mr-5 mb-4 w-64'>
                    <DeckDetails deck={deck} onEditDetails={() => setIsEditingDeckDetails(true)} />
                </div>
                <div className='flex-grow editor-width'>
                    {getDisplayedComponent()}
                </div>
            </div>
        </div >
    )
}

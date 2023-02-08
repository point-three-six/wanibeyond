'use client';

import React from 'react';
import sendExtMsg from '../../../../lib/wpExtension';
import Script from 'next/script';

export default function LevelList(props) {
    let dragItem: object;
    let dragOverLevel: number;

    function getItemTitle(item) {
        if (item.type == 'radical') return item.data.rad;
        if (item.type == 'kanji') return item.data.kan;
        if (item.type == 'vocab') return item.data.voc;
        if (item.type == 'kanavocab') return item.data.characters;
        return '';
    }

    const dragStart = (e, item) => {
        dragItem = item;
    };

    const dragEnter = (e, level) => {
        dragOverLevel = level;
    };

    const drop = (e) => {
        if (dragItem && dragItem.level != dragOverLevel) {
            updateItemLevel(dragItem, dragOverLevel);
        }
    };

    async function updateItemLevel(item, newLevel) {
        const res = await fetch(`/api/deck/changeLevel`, {
            method: 'PUT',
            body: JSON.stringify({
                itemId: item.id,
                level: newLevel,
                deckId: props.deck.id
            })
        })

        if (res.status == 200) {
            sendExtMsg('sync', true, () => { });
            props.onItemLevelChange(item, newLevel);
        }
    }

    return (
        <div>
            {
                props.levels.map(level =>
                    <div id={`level-${level}`} key={level}
                        onDragEnter={(e) => dragEnter(e, level)}
                        onDragEnd={drop}>
                        <div className='flex items-center'>
                            <div className='flex-grow h-px bg-gray-400'></div>
                            <span className='flex-shrink text-lg text-slate-500 dark:text-inherit px-4 font-light'>
                                {level == 0 ? 'Any level' : `Level ${level}`}
                            </span>
                            <div className='flex-grow h-px bg-gray-400'></div>
                        </div>
                        <div className='items flex gap-2'>
                            {props.deck.items
                                .filter(item => item.level == level)
                                .filter(item => item.data.en[0].toLowerCase().indexOf(props.filter.toLowerCase()) != -1)
                                .map(item =>
                                    <div key={item.id} draggable onDragStart={(e) => dragStart(e, item)} className={`item ${item.type}`} onClick={() => props.onItemClick(item.id)}>
                                        {getItemTitle(item)}
                                        <div className='meaning text-xs'>
                                            {item.data.en[0]}
                                        </div>
                                    </div>
                                )}
                            <div className='item add' onClick={e => props.onAddItem(level)}>
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
    )
}


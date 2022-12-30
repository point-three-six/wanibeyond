'use client';

import React from 'react'

export default function LevelList(props) {
    function getItemTitle(item) {
        if (item.type == 'radical') return item.data.rad;
        if (item.type == 'kanji') return item.data.kan;
        if (item.type == 'vocab') return item.data.voc;
        if (item.type == 'kana') return item.data.hir;
        return '';
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
        <div>
            {
                props.levels.map(level =>
                    <div key={level}>
                        <div className='flex items-center'>
                            <div className='flex-grow h-px bg-gray-400'></div>
                            <span className='flex-shrink text-lg text-slate-500 px-4 font-light'>
                                {level == 0 ? 'Any level' : `Level ${level}`}
                            </span>
                            <div className='flex-grow h-px bg-gray-400'></div>
                        </div>
                        <div className='items flex gap-2'>
                            {props.deck.items
                                .filter(item => item.level == level)
                                .filter(item => item.data.en[0].toLowerCase().indexOf(props.filter.toLowerCase()) != -1)
                                .map(item =>
                                    <div key={item.id} className={`item ${item.type}`}>
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


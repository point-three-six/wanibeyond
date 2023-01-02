'use client';

import React, { useState } from 'react'
import MultiInput from './MultiInput';
import ItemSearch from './ItemSearch';
import '../../../../styles/checkmark.css'

function getTypeDisplayText(value: string) {
    if (value == '') return 'Characters';
    if (value == 'kanji') return 'Kanji Character';
    if (value == 'vocab') return 'Vocabulary Word';
    if (value == 'kana') return 'Kana';
    if (value == 'radical') return 'Radical Character';
}

export default function AddItem(props) {
    // item data
    let item = {};

    let [itemType, setItemType] = useState('');
    let [meaning, setMeaning] = useState('');
    let [meaningHint, setMeaningHint] = useState('');
    let [mmne, setMmne] = useState('');
    let [readingHint, setReadingHint] = useState('');
    let [rmne, setRmne] = useState('');
    let [onyomi, setOnyomi] = useState('');
    let [kunyomi, setKunyomi] = useState('');
    let [radicals, setRadicals] = useState([]);

    return (
        <div className={props.addingItem}>
            <div className='flex justify-between mb-4'>
                <div className='text-sm font-medium text-gray-700'>
                    {`<< go back`}
                </div>
                <div className='text-sm font-medium text-gray-700'>
                    Level {props.level}
                </div>
            </div>
            <div className='text-center'>
                <div className={`item ${itemType ? itemType : 'add'} large`}>
                    <div>
                        preview
                    </div>
                    <div className='meaning text-xs'>buy</div>
                </div>
            </div>
            <div className=''>
                {/* item type */}
                <div className={`flex items-center mb-3`}>
                    <div className='flex-grow'>
                        <label htmlFor='privacy' className='text-sm font-medium text-gray-700'>Item Type</label>
                        <div className='mt-1'>
                            <select
                                name='privacy'
                                className='border border-gray-300 w-full'
                                defaultValue={''}
                                onChange={e => setItemType(e.target.value)}
                            >
                                <option value=''></option>
                                <option value='kanji'>Kanji</option>
                                <option value='vocab'>Vocab</option>
                                <option value='radical'>Radical</option>
                                {/* <option value='kana'>Kana-only Vocab</option> */}
                            </select>
                        </div>
                    </div>
                </div>
                {/* characters */}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='deckName' className='text-sm font-medium text-gray-700'>
                            {getTypeDisplayText(itemType)}
                        </label>
                        <div className='mt-1'>
                            <input
                                name='meaning'
                                type='text'
                                className='border border-gray-300 w-full'
                                placeholder=''
                            />
                        </div>
                    </div>
                </div>
                {/* radicals -- kanji,  */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Radicals</label>
                        <div className='mt-1'>
                            <ItemSearch type='radical' value={radicals} onChange={setRadicals} />
                        </div>
                    </div>
                </div>
                {/* vocabulary -- kanji,  */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Vocabulary</label>
                        <div className='mt-1'>
                            <ItemSearch type='radical' value={radicals} onChange={setRadicals} />
                        </div>
                    </div>
                </div>
                {/* onyomi */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='privacy' className='text-sm font-medium text-gray-700'>On'yomi</label>
                        <div className='mt-1'>
                            <MultiInput value={onyomi} onChange={setOnyomi} />
                        </div>
                    </div>
                </div>
                {/* kunyomi */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='privacy' className='text-sm font-medium text-gray-700'>Kun'yomi</label>
                        <div className='mt-1'>
                            <MultiInput value={kunyomi} onChange={setKunyomi} />
                        </div>
                    </div>
                </div>
                {/* meaning mnemonic kanji,*/}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Meaning Mnemonic</label>
                        <div className='mt-1'>
                            <textarea
                                name='description'
                                className='border border-gray-300 w-full'
                                maxLength={500}
                                onChange={e => {
                                    setMmne(e.target.value)
                                }}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                {/* hint kanji,  */}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Mnemonic Hint</label>
                        <div className='mt-1'>
                            <textarea
                                name='description'
                                className='border border-gray-300 w-full'
                                maxLength={500}
                                onChange={e => {
                                    setMeaningHint(e.target.value)
                                }}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                {/* reading mnemonic -- kanji,*/}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Reading Mnemonic</label>
                        <div className='mt-1'>
                            <textarea
                                name='description'
                                className='border border-gray-300 w-full'
                                maxLength={500}
                                onChange={e => {
                                    setRmne(e.target.value)
                                }}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                {/* reading hint -- kanji,  */}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Reading Hint</label>
                        <div className='mt-1'>
                            <textarea
                                name='description'
                                className='border border-gray-300 w-full'
                                maxLength={500}
                                onChange={e => {
                                    setReadingHint(e.target.value)
                                }}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
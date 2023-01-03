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
    let [itemType, setItemType] = useState('');
    let [level, setLevel] = useState(0);
    let [meaning, setMeaning] = useState('');
    let [characters, setCharacters] = useState('');

    let [radicals, setRadicals] = useState([]);
    let [vocabulary, setVocabulary] = useState([]);

    let [meaningHint, setMeaningHint] = useState('');
    let [mmne, setMmne] = useState('');
    let [readingHint, setReadingHint] = useState('');
    let [rmne, setRmne] = useState('');
    let [onyomi, setOnyomi] = useState('');
    let [kunyomi, setKunyomi] = useState('');

    async function sendRequest(url, arg) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
    }

    function submit() {
        sendRequest('/api/deck/add', {
            type: itemType,
            level: level,
            meaning: meaning,
            characters: characters,
            radicals: radicals,
            vocabulary: vocabulary,
            meaningHint: meaningHint,
            mmne: mmne,
            readingHint: readingHint,
            rmne: rmne,
            onyomi: onyomi,
            kunyomi: kunyomi
        }).then(async (res) => {
            let r = await res.json();
            if (res.status == 200 && 'item' in r) {
                // success
                props.onItemAdded(r.item);
            } else if ('e' in r) {
                // error message returned
            }
        })
    }


    return (
        <div className={props.addingItem}>
            <div className='flex justify-between mb-4'>
                <div className='font-medium text-gray-700'>
                    <a href="#" onClick={() => props.back()}>{`<< go back`}</a>
                </div>
                <div className='font-medium text-gray-700'>
                    Level {props.level}
                </div>
            </div>
            <div className='text-center'>
                <div className={`item ${itemType ? itemType : 'add'} large`}>
                    <div>
                        {characters ? characters : 'example'}
                    </div>
                    <div className='meaning text-xs'>
                        {meaning ? meaning : 'example'}
                    </div>
                </div>
            </div>
            <div className=''>
                {/* item type */}
                <div className={`flex items-center mb-3`}>
                    <div className='flex-grow'>
                        <label htmlFor='itemType' className='text-sm font-medium text-gray-700'>Item Type</label>
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
                {/* item type */}
                <div className={`flex items-center mb-3`}>
                    <div className='flex-grow'>
                        <label htmlFor='level' className='text-sm font-medium text-gray-700'>Level</label>
                        <div className='mt-1'>
                            <input
                                name='level'
                                type='number'
                                className='border border-gray-300 w-full'
                                placeholder=''
                                min={0}
                                max={99}
                                onChange={(e) => {
                                    setLevel(parseInt(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* meaning */}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='meaning' className='text-sm font-medium text-gray-700'>
                            Meaning
                        </label>
                        <div className='mt-1'>
                            <input
                                name='meaning'
                                type='text'
                                className='border border-gray-300 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setMeaning(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* characters */}
                <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='characters' className='text-sm font-medium text-gray-700'>
                            {getTypeDisplayText(itemType)}
                        </label>
                        <div className='mt-1'>
                            <input
                                name='characters'
                                type='text'
                                className='border border-gray-300 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setCharacters(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* radicals -- kanji,  */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Radicals</label>
                        <div className='mt-1'>
                            <ItemSearch type='radical' onChange={setRadicals} />
                        </div>
                    </div>
                </div>
                {/* vocabulary -- kanji,  */}
                <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='description' className='text-sm font-medium text-gray-700'>Vocabulary (search w/ english or hiragana)</label>
                        <div className='mt-1'>
                            <ItemSearch type='vocabulary' onChange={setVocabulary} />
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
                <div className={`text-center mt-8 ${(itemType) ? '' : 'hidden'}`}>
                    <button
                        type='button'
                        className='text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                        onClick={submit}
                    >
                        <div className='mr-1 inline'>
                            <span>+</span>
                            <span className='hidden'>
                                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                        create {itemType}
                    </button>
                </div >
            </div>
        </div>
    )
}
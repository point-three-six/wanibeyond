'use client';

import React, { useState } from 'react';

export default function Step3(props) {

    return (
        <>
            <div className={`flex mb-5`}>
                <div className={`flex-initial circle mr-6 mt-3 ${props.itemType ? 'checked' : ''}`}>
                    <div className={`checkmark ${props.itemType ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='deck' className='text-sm font-medium text-gray-700 dark:text-inherit'>Item Type</label>
                    <div className='mt-1 mb-4 '>What type of items will you be importing?</div>
                    <div>
                        <select
                            name='deck'
                            className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 focus:border-slate-500 focus:outline-none focus:ring-slate-500 w-full'
                            defaultValue={props.itemType}
                            onChange={e => { props.onItemTypeChosen(e.target.value) }}
                        >
                            <option value=''></option>
                            <option value='kanji'>Kanji</option>
                            <option value='radical'>Radical</option>
                            <option value='vocab'>Vocabulary</option>
                            <option value='kanavocab'>Kana Vocabulary</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-8 ${!props.itemType ? 'hidden' : ''}`}>
                <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => props.onNext({})}>
                    continue
                </button>
            </div >
        </>
    )
}

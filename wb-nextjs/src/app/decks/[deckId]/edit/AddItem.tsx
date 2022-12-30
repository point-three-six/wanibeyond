'use client';

import React from 'react'

export default function AddItem(props) {
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
                <div className='item add large'>
                    <div>
                        preview
                    </div>
                    <div className='meaning text-xs'>buy</div>
                </div>
            </div>
            <div className=''>
                <div className='flex items-center mb-3'>
                    <div className={`circle mr-6`}>
                        <div className={`checkmark`}></div>
                    </div>
                    <div className='flex-grow'>
                        <label htmlFor='deckName' className='text-sm font-medium text-gray-700'>Name</label>
                        <div className='mt-1'>
                            <input
                                name='deckName'
                                type='text'
                                className='border border-gray-300 w-full'
                                placeholder='My deck name'
                            />
                        </div>
                    </div>
                </div>
                <div className={`flex items-center mb-3`}>
                    <div className={`circle mr-6`}>
                        <div className={`checkmark`}></div>
                    </div>
                    <div className='flex-grow'>
                        <label htmlFor='privacy' className='text-sm font-medium text-gray-700'>Level</label>
                        <div className='mt-1'>
                            <select
                                name='privacy'
                                className='border border-gray-300 w-full'
                                defaultValue={''}
                            >
                                <option value=''></option>
                                <option value='no'>Listed: Anyone can see & use my deck.</option>
                                <option value='yes'>Private: Only I can see & use my deck.</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
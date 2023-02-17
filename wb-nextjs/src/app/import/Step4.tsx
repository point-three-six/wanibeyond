'use client';

import React, { useState } from 'react';
import Mapper from './Mapper';

export default function Step4(props) {

    let [allRequiredFieldsMapped, setAllRequiredFieldsMapped] = useState(false);

    function getMappingField() {
        if (props.mappingPopupConfirmed) {
            return (
                <>
                    <div className='mb-3'>Please map the fields below.</div>
                    <div className='mb-3'>
                        Only fields marked with <span className='text-orange-600 px-1'>*</span> are required.
                    </div>
                    <Mapper
                        columns={props.columns}
                        mappings={props.mappings}
                        itemType={props.itemType}
                        onMappingsUpdated={(mappings) => props.onMappingsUpdated(mappings)}
                        onAllRequiredFieldsMapped={(bool) => setAllRequiredFieldsMapped(bool)}
                    />
                </>
            );
        } else {
            return (
                <>
                    <div className='mb-3'>
                        The mapping process will allow you to select what columns in your file correlate to which WaniPlus item values.
                    </div>
                    <div className='mb-6'>
                        For example, if your file contains a column named <span className='bg-neutral-100 dark:bg-neutral-700 dark:text-inherit p-1'>item_meaning</span>, you will map that column to WaniPlus's <span className='bg-neutral-100 dark:bg-neutral-700 dark:text-inherit p-1'>meaning</span> field.

                        Now WaniPlus will know that the <span className='bg-neutral-100 dark:bg-neutral-700 dark:text-inherit p-1'>item_meaning</span> column is the item's definition, and automatically assign the definition to your newly imported items.
                    </div>
                    <button
                        type="button"
                        className="text-white bg-neutral-400 hover:bg-neutral-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2"
                        onClick={() => props.onMappingPopupConfirmed()}>
                        Okay
                    </button>
                </>
            )
        }
    }

    return (
        <>
            <div className={`flex mb-12`}>
                <div className={`flex-initial circle mr-6 mt-3 ${allRequiredFieldsMapped ? 'checked' : ''}`}>
                    <div className={`checkmark ${allRequiredFieldsMapped ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-1 w-full flex-override'>
                    <label htmlFor='privacy' className='text-sm font-medium text-gray-700 dark:text-inherit'>Mapping</label>
                    {getMappingField()}
                </div>
            </div>
            <div className={`text-center mt-8 ${!allRequiredFieldsMapped ? 'hidden' : ''}`}>
                <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => props.onNext({})}>
                    continue
                </button>
            </div>
        </>
    )
}

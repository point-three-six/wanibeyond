import { SP } from 'next/dist/shared/lib/utils';
import React from 'react';
import SpecialColumnsList from './SpecialColumnsList';

export default function Page() {
    return (
        <div className='max-width'>
            <h1 className="text-3xl font-bold text-slate-700 dark:text-inherit mb-2">Import Guide</h1>
            <div>
                Manually adding a lot of items to WaniPlus can be very time consuming. To speed up this process, the import process was established to help you utilize existing sources of data to automatically populate your decks.
            </div>
            <a id="basics"><h2 className='text-xl font-bold text-slate-700 mt-8 border-l-8 border-neutral-200 dark:border-neutral-700 pl-3 dark:text-inherit'>Basics</h2></a>
            <div className='mt-2'>
                Importing data from a file is fairly simple. There are only a few basic requirements.
            </div>
            <div className='mt-6 text-sm font-medium italic'>
                File Type
            </div>
            <div className='mt-1 pl-3'>
                The only files supported currently are CSV files.
            </div>
            <div className='mt-6 text-sm font-medium italic'>
                File Size
            </div>
            <div className='mt-1 pl-3'>
                The maximum file upload size is 20MB.
            </div>
            <a id="special-columns"><h2 className='text-xl font-bold text-slate-700 mt-8 border-l-8 border-neutral-200 dark:border-neutral-700 pl-3 dark:text-inherit'>Item Fields</h2></a>
            <div className='mt-2'>
                Depending on the type (<i>radical</i>, <i>kanji</i>, <i>vocabulary</i>), an item will require different information and properties.
            </div>
            <div className='mt-2'>
                <i>(todo: write list of fields)</i>
            </div>
            <a id="special-columns"><h2 className='text-xl font-bold text-slate-700 mt-8 border-l-8 border-neutral-200 dark:border-neutral-700 pl-3 dark:text-inherit'>Special Columns</h2></a>
            <div className='mt-2'>
                To give you more control over the importing process, WaniPlus has a list of pre-defined columns that it will look for in your file.
                These special columns give more information to WaniPlus on how your data should be imported.
            </div>
            <div className='mt-2'>
                Below are a list of special columns that are currently supported.
            </div>
            <div className='mt-7'>
                <SpecialColumnsList />
            </div>
        </div>
    )
}
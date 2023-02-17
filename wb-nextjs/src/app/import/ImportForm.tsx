'use client';

import React, { useState } from 'react';

import '../../styles/checkmark.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Review from './Review';

export default function ImportForm(props) {
    let specialColumnsList = [
        'waniplus_id'
    ];

    // dont know anything about redux but I can assume this
    // is exactly what it is created to prevent
    let [step, setStep] = useState(1);
    let [deck, setDeck] = useState(0);
    let [file, setFile] = useState(null);
    let [fileData, setFileData] = useState(null);
    let [hasHeaderRow, setHasHeaderRow] = useState(true);
    let [isHeaderRowConfirmed, setIsHeaderRowConfirmed] = useState(false);
    let [itemType, setItemType] = useState('');
    let [scPopupClicked, setScPopupClicked] = useState(false);
    let [detectedSpecialColumns, setDetectedSpecialColumns] = useState([]);
    let [mappingPopupConfirmed, setMappingPopupConfirmed] = useState(false);
    let [mappings, setMappings] = useState({});

    function onFileLoaded({ file, results }) {
        setFile(file);
        setFileData(results);

        // detect special columns
        let detected = results.data[0].filter(column => specialColumnsList.indexOf(column.toLowerCase()) !== -1);
        setDetectedSpecialColumns(detected);
    }

    function submit() {
        let fd = new FormData();
        let metadata = JSON.stringify({
            deck: deck,
            type: itemType,
            mappings: mappings,
            hasHeaderRow: hasHeaderRow
        });
        fd.append('data', metadata);
        fd.append('file', file);

        fetch('/api/deck/import', {
            method: 'POST',
            body: fd
        }).then(res => {
            console.log(res.status);
        });
    }

    function getStepComponent() {
        switch (step) {
            case 5:
                return <Review
                    file={file}
                    deckName={props.decks[deck].name}
                    itemType={itemType}
                    onSubmit={submit}
                />
            case 4:
                return <Step4
                    itemType={itemType}
                    columns={fileData.data[0]}
                    mappings={mappings}
                    hasHeaderRow={hasHeaderRow}
                    mappingPopupConfirmed={mappingPopupConfirmed}
                    onMappingsUpdated={(mappings) => setMappings(mappings)}
                    onMappingPopupConfirmed={() => setMappingPopupConfirmed(true)}
                    onNext={() => setStep(5)}
                />;
            case 3:
                return <Step3
                    onNext={() => setStep(4)}
                    itemType={itemType}
                    onItemTypeChosen={(val) => setItemType(val)}
                />;
            case 2:
                return <Step2
                    fileData={fileData}
                    onNext={() => setStep(3)}
                    hasHeaderRow={hasHeaderRow}
                    detectedSpecialColumns={detectedSpecialColumns}
                    isHeaderRowConfirmed={isHeaderRowConfirmed}
                    onHeaderRowChanged={() => setHasHeaderRow(!hasHeaderRow)}
                    onHeaderRowConfirmed={() => setIsHeaderRowConfirmed(true)}
                    scPopupClicked={scPopupClicked}
                    onScPopupClicked={() => setScPopupClicked(true)}
                />;
            default:
                return <Step1
                    decks={props.decks}
                    deck={deck}
                    file={file}
                    onNext={() => setStep(2)}
                    onFileLoaded={onFileLoaded}
                    onDeckChosen={(id) => setDeck(id)}
                />;
        }
    }

    return (
        <>
            <div className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-5' aria-label='Breadcrumb'>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                    <li className='inline-flex items-center'>
                        <a
                            href='#'
                            className={`inline-flex items-center text-sm ${step == 1 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'`}
                            onClick={(e) => { e.preventDefault(); setStep(1); }}>
                            Step 1
                        </a>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 2 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); setStep(2); }}>
                                Step 2
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 3 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); setStep(3); }}>
                                Step 3
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 4 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); setStep(4); }}>
                                Step 4
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 4 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); setStep(5); }}>
                                Review
                            </a>
                        </div>
                    </li>
                </ol>
            </div>
            {getStepComponent(step)}
        </>
    );
}
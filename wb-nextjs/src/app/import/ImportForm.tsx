'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import sendExtMsg from '../../lib/wpExtension';

import '../../styles/checkmark.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Review from './Review';

export default function ImportForm(props) {
    let specialColumnsList = [
        'waniplus_id',
        'waniplus_level',
        'waniplus_srs'
    ];

    // dont know anything about redux but I can assume this
    // is exactly what it is created to prevent
    let [maxStep, setMaxStep] = useState(1);
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
    let [isImporting, setIsImporting] = useState(false); // while requesting is processing
    let [importRequestStatus, setImportRequestStatus] = useState(0);

    function onFileLoaded({ file, results }) {
        setFile(file);
        setFileData(results);

        // detect special columns
        let detected = results.data[0].filter(column => specialColumnsList.indexOf(column.toLowerCase()) !== -1);
        setDetectedSpecialColumns(detected);
    }

    function getColumns() {
        if (hasHeaderRow) {
            return fileData.data[0];
        } else {
            return fileData.data[0].map((col, i) => 'Column ' + i);
        }
    }

    function navigate(newStep, override) {
        if (isImporting || importRequestStatus == 200) return; //disable nav on successful import
        if (!override && (newStep > maxStep)) return; // can't skip forward
        if (override && newStep > maxStep) setMaxStep(newStep);
        setStep(newStep);
    }

    function submit() {
        setIsImporting(true);

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
            setIsImporting(false);
            setImportRequestStatus(res.status);
            sendExtMsg('sync', true, () => { });
        });
    }

    function getStepComponent() {
        switch (step) {
            case 5:
                return <Review
                    file={file}
                    deckName={props.decks.filter(d => d.id == deck)[0].name}
                    itemType={itemType}
                    isImporting={isImporting}
                    importRequestStatus={importRequestStatus}
                    onSubmit={submit}
                />
            case 4:
                return <Step4
                    itemType={itemType}
                    columns={getColumns()}
                    mappings={mappings}
                    hasHeaderRow={hasHeaderRow}
                    mappingPopupConfirmed={mappingPopupConfirmed}
                    onMappingsUpdated={(mappings) => setMappings(mappings)}
                    onMappingPopupConfirmed={() => setMappingPopupConfirmed(true)}
                    onNext={() => navigate(5, true)}
                />;
            case 3:
                return <Step3
                    onNext={() => navigate(4, true)}
                    itemType={itemType}
                    onItemTypeChosen={(val) => setItemType(val)}
                />;
            case 2:
                return <Step2
                    fileData={fileData}
                    onNext={() => navigate(3, true)}
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
                    onNext={() => navigate(2, true)}
                    onFileLoaded={onFileLoaded}
                    onDeckChosen={(id) => setDeck(parseInt(id))}
                />;
        }
    }

    return (
        <>
            <div className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-inherit mb-5' aria-label='Breadcrumb'>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                    <li className='inline-flex items-center'>
                        <a
                            href='#'
                            className={`inline-flex items-center text-sm ${step == 1 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-inherit dark:hover:text-white'`}
                            onClick={(e) => { e.preventDefault(); navigate(1); }}>
                            Step 1
                        </a>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 2 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-inherit dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); navigate(2); }}>
                                Step 2
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 3 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-inherit dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); navigate(3); }}>
                                Step 3
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 4 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-inherit dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); navigate(4); }}>
                                Step 4
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className={`inline-flex items-center text-sm ${step == 4 ? 'font-bold' : 'font-medium'} text-gray-700 hover:text-blue-600 dark:text-inherit dark:hover:text-white'`}
                                onClick={(e) => { e.preventDefault(); navigate(5); }}>
                                Review
                            </a>
                        </div>
                    </li>
                </ol>
            </div>
            {getStepComponent(step)}
            <div className='mt-12 mb-6 pt-5 border-t border-neutral-200 dark:border-neutral-700 text-sm font-medium text-center'>
                <Link href='/guides/import' className='text-slate-600 dark:text-neutral-400' target='_blank'>Need help? See the import guide & documentation</Link>
            </div>
        </>
    );
}
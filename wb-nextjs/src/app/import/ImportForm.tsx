'use client';

import React, { useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import Step1 from './Step1';
import Step2 from './Step2';

export default function ImportForm(props) {

    let [step, setStep] = useState(1);
    let [deck, setDeck] = useState(0);
    let [file, setFile] = useState(null);
    let [fileData, setFileData] = useState(null);

    function onFileLoaded({ file, results }) {
        setFile(file);
        setFileData(results);
    }

    function submit() {
        let data = new FormData();
        data.append('deck', deck);
        data.append('file', file);

        fetch('/api/deck/import', {
            method: 'POST',
            body: data
        }).then(res => {
            console.log(res.status);
        });
    }

    function getStepComponent() {
        switch (step) {
            case 2:
                return <Step2
                    onNext={() => setStep(2)}
                ></Step2>;
            default:
                return <Step1
                    decks={props.decks}
                    deck={deck}
                    file={file}
                    onNext={() => setStep(2)}
                    onFileLoaded={onFileLoaded}
                    onDeckChosen={(id) => setDeck(id)}
                ></Step1>;
        }
    }

    return (
        <>
            <div className='flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-5' aria-label='Breadcrumb'>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                    <li className='inline-flex items-center'>
                        <a
                            href='#'
                            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                            onClick={(e) => { e.preventDefault(); setStep(1); }}>
                            Step 1
                        </a>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg aria-hidden='true' className='w-6 h-6 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path></svg>
                            <a
                                href='#'
                                className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white'
                                onClick={(e) => { e.preventDefault(); setStep(2); }}>
                                Step 2
                            </a>
                        </div>
                    </li>
                </ol>
            </div>
            {getStepComponent(step)}
        </>
    );
}
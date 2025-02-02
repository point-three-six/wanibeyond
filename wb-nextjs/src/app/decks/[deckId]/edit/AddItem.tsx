'use client';

import React, { useState } from 'react'
import MultiInput from './MultiInput';
import ItemSearch from './ItemSearch';
import DeleteModal from './DeleteModal';
import '../../../../styles/checkmark.css';

function getTypeDisplayText(value: string) {
    if (value == '') return 'Characters';
    if (value == 'kanji') return 'Kanji Character';
    if (value == 'vocab') return 'Vocabulary Word';
    if (value == 'kanavocab') return 'Kana-only Vocab';
    if (value == 'radical') return 'Radical Character';
}

export default function AddItem(props) {
    // this will only be set when EDITING an item
    let eitm = Object.keys(props.item).length > 0 ? props.item : false;

    // modal state
    let [showDeleteModal, setShowDeleteModal] = useState(false);

    // item data
    let [itemType, setItemType] = useState(eitm ? eitm.type : '');
    let [level, setLevel] = useState(props.level);
    let [characters, setCharacters] = useState(eitm ? eitm.data.characters : '');
    let [aud, setAud] = useState((eitm && eitm.data.aud) ? eitm.data.aud : '');

    let [ctx1, setCtx1] = useState(eitm && eitm.data.sentences && eitm.data.sentences.length >= 1 ? eitm.data.sentences[0][1] : '');
    let [ctx1jap, setCtx1jap] = useState(eitm && eitm.data.sentences && eitm.data.sentences.length >= 1 ? eitm.data.sentences[0][0] : '');

    let [ctx2, setCtx2] = useState(eitm && eitm.data.sentences && eitm.data.sentences.length >= 2 ? eitm.data.sentences[1][1] : '');
    let [ctx2jap, setCtx2jap] = useState(eitm && eitm.data.sentences && eitm.data.sentences.length >= 2 ? eitm.data.sentences[1][0] : '');

    let [meanings, setMeanings] = useState(eitm ? eitm.data.en : []);
    let [kana, setKana] = useState(eitm && eitm.data.kana ? eitm.data.kana : []);
    let [kanji, setKanji] = useState(eitm && eitm.data.kanji ? eitm.data.kanji : []);
    let [radicals, setRadicals] = useState(eitm && eitm.data.radicals ? eitm.data.radicals : []);
    let [vocabulary, setVocabulary] = useState(eitm && eitm.data.vocabulary ? eitm.data.vocabulary : []);

    let [auxMeanings, setAuxMeanings] = useState(eitm ? eitm.data.auxiliary_meanings : []);
    let [auxReadings, setAuxReadings] = useState(eitm ? eitm.data.auxiliary_readings : []);

    let [meaningHint, setMeaningHint] = useState(eitm && eitm.data.mhnt ? eitm.data.mhnt : '');
    let [mmne, setMmne] = useState(eitm ? eitm.data.mmne : '');
    let [readingHint, setReadingHint] = useState(eitm && eitm.data.rhnt ? eitm.data.rhnt : '');
    let [rmne, setRmne] = useState(eitm ? eitm.data.rmne : '');
    let [onyomi, setOnyomi] = useState(eitm && eitm.data.on ? eitm.data.on : []);
    let [kunyomi, setKunyomi] = useState(eitm && eitm.data.kun ? eitm.data.kun : []);
    let [emphasis, setEmphasis] = useState(eitm && eitm.data.emph ? eitm.data.emph : 'onyomi');

    let [collocations, setCollocations] = useState(eitm && eitm.data.collocations ? eitm.data.collocations : []);

    let predefinedPos = (eitm && 'parts_of_speech' in eitm.data) ? eitm.data.parts_of_speech : [];
    let [isNoun, setIsNoun] = useState(predefinedPos ? predefinedPos.indexOf('noun') != -1 : false);
    let [isVerb, setIsVerb] = useState(predefinedPos ? predefinedPos.indexOf('verb') != -1 : false);
    let [isAdverb, setIsAdverb] = useState(predefinedPos ? predefinedPos.indexOf('adverb') != -1 : false);
    let [isNumeral, setIsNumeral] = useState(predefinedPos ? predefinedPos.indexOf('numeral') != -1 : false);

    async function sendRequest(url, arg) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
    }

    function getPartsOfSpeech() {
        let pos = [];
        if (isNoun) pos.push('noun');
        if (isVerb) pos.push('verb');
        if (isAdverb) pos.push('adverb');
        if (isNumeral) pos.push('numeral');
        return pos;
    }

    const formatAuxiliary = (label: string, values: string[]) =>
        (values || []).map((value) => {
            return {
                label: value,
                'type': 'whitelist'
            }
        });

    // build the payload dependent on itemType
    function buildPayload() {
        if (itemType == 'kanji') {
            return {
                type: itemType,
                level: level,
                en: meanings,
                characters: characters.trim(),
                radicals: radicals,
                vocabulary: vocabulary,
                meaningHint: meaningHint.trim(),
                mmne: mmne.trim(),
                readingHint: readingHint.trim(),
                rmne: rmne.trim(),
                onyomi: onyomi,
                kunyomi: kunyomi,
                emph: emphasis,
                auxiliary_meanings: formatAuxiliary('meaning', auxMeanings),
                auxiliary_readings: formatAuxiliary('reading', auxReadings)
            };
        } else if (itemType == 'vocab') {
            return {
                type: itemType,
                aud: aud,
                kana: kana,
                level: level,
                kanji: kanji,
                en: meanings,
                parts_of_speech: getPartsOfSpeech(),
                characters: characters.trim(),
                radicals: radicals,
                vocabulary: vocabulary,
                meaningHint: meaningHint.trim(),
                mmne: mmne.trim(),
                readingHint: readingHint.trim(),
                rmne: rmne.trim(),
                ctx1: ctx1.trim(),
                ctx1jap: ctx1jap.trim(),
                ctx2: ctx2.trim(),
                ctx2jap: ctx2jap.trim(),
                collocations: collocations,
                auxiliary_meanings: formatAuxiliary('meaning', auxMeanings),
                auxiliary_readings: formatAuxiliary('reading', auxReadings)
            };
        } else if (itemType == 'radical' || itemType == 'kanavocab') {
            return {
                type: itemType,
                level: level,
                en: meanings,
                characters: characters.trim(),
                kanji: kanji,
                meaningHint: meaningHint.trim(),
                mmne: mmne.trim(),
                auxiliary_meanings: formatAuxiliary('meaning', auxMeanings),
            };
        }
    }

    function submit() {
        let payload = buildPayload();

        let params = {
            deckId: props.deckId,
            update: eitm ? eitm.id : false,
            payload: payload
        };

        sendRequest('/api/deck/add', params).then(async (res) => {
            let r = await res.json();

            if (res.status == 200 && 'item' in r) {
                if (eitm) {
                    props.onItemEdited(r.item);
                } else {
                    props.onItemAdded(r.item);
                }

                props.back();
            } else if ('e' in r) {
                // error message returned
            }
        })
    }

    async function deleteItem(item) {
        const res = await fetch(`/api/deck/deleteItem`, {
            method: 'DELETE',
            body: JSON.stringify({
                itemId: item.id,
                deckId: props.deckId
            })
        })

        if (res.status == 200) {
            setShowDeleteModal(false);
            props.onItemDeleted(props.item);
            props.back();
        }
    }

    return (
        <div className={props.addingItem}>
            <DeleteModal
                hidden={!showDeleteModal}
                onDelete={() => deleteItem(props.item)}
                onCancel={() => setShowDeleteModal(false)}
            />
            <div className='flex justify-between mb-4'>
                <div className='font-medium text-gray-700 underline'>
                    <a href="#" onClick={() => props.back()} className='dark:text-orange-500'>{`<< go back`}</a>
                </div>
                <div className={`font-medium text-red-500 underline ${eitm ? 'hidden' : ''}}`}>
                    <a href="#" onClick={() => setShowDeleteModal(true)}>
                        delete item
                    </a>
                </div>
            </div>
            <div className='text-center mb-3'>
                <div className={`item ${itemType ? itemType : 'add'} large`}>
                    <div>
                        {characters ? characters : 'example'}
                    </div>
                    <div className='meaning text-xs'>
                        {meanings[0] ? meanings[0] : 'example'}
                    </div>
                </div>
            </div>
            <div>
                <fieldset className='border p-3'>
                    <legend>Required Fields <span className='text-red-500'>*</span></legend>
                    {/* item type */}
                    <div className={`flex items-center mb-3 ${eitm ? 'hidden' : ''}`}>
                        <div className='flex-grow'>
                            <label htmlFor='itemType' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Item Type <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-1'>
                                <select
                                    name='privacy'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    defaultValue={itemType}
                                    onChange={e => setItemType(e.target.value)}
                                >
                                    <option value=''></option>
                                    <option value='kanji'>Kanji</option>
                                    <option value='vocab'>Vocab</option>
                                    <option value='radical'>Radical</option>
                                    <option value='kanavocab'>Kana-only Vocab</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* level */}
                    <div className={`flex items-center mb-3`}>
                        <div className='flex-grow'>
                            <label htmlFor='level' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Level <span className='text-red-500'>*</span><br />
                                <span className='text-xs'><span className='font-bold'>note:</span> level 0 means the item is available at ALL levels</span>
                            </label>
                            <div className='mt-1'>
                                <input
                                    name='level'
                                    type='number'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    placeholder=''
                                    value={level}
                                    min={0}
                                    max={99}
                                    onChange={(e) => {
                                        setLevel(parseInt(e.target.value))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* characters */}
                    <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='characters' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                {getTypeDisplayText(itemType)} <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-1'>
                                <input
                                    name='characters'
                                    type='text'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    placeholder=''
                                    value={characters}
                                    onChange={(e) => {
                                        if (['vocab', 'kanavocab'].indexOf(itemType) != -1) {
                                            setCharacters(wanakana.toKana(e.target.value))
                                        } else {
                                            setCharacters(e.target.value)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* meaning */}
                    <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='meanings' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Meanings (first is primary) <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-1 '>
                                <MultiInput value={meanings} onChange={setMeanings} />
                            </div>
                        </div>
                    </div>
                    {/* kana - vocab */}
                    <div className={`flex items-center mb-3 ${itemType == 'vocab' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='kana' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Reading <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-1'>
                                <MultiInput value={kana} onChange={setKana} kana={true} />
                            </div>
                        </div>
                    </div>
                    {/* parts of speech - vocab */}
                    <div className={`flex items-center mb-3 ${itemType == 'vocab' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='kana' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Parts of Speech <span className='text-red-500'>*</span>
                            </label>
                            <div className='mt-1'>
                                <div className='flex'>
                                    <div>
                                        <div className='form-check'>
                                            <input checked={isNoun} onChange={() => setIsNoun(!isNoun)} type='checkbox' value='' id='posNoun' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500' />
                                            <label className='form-check-label inline-block text-gray-800 dark:text-inherit' htmlFor='posNoun'>
                                                Noun
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <input checked={isVerb} onChange={() => setIsVerb(!isVerb)} type='checkbox' value='' id='posNoun' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500' />
                                            <label className='form-check-label inline-block text-gray-800 dark:text-inherit' htmlFor='posNoun'>
                                                Verb
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <input checked={isAdverb} onChange={() => setIsAdverb(!isAdverb)} type='checkbox' value='' id='posNoun' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500' />
                                            <label className='form-check-label inline-block text-gray-800 dark:text-inherit' htmlFor='posNoun'>
                                                Adverb
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <input checked={isNumeral} onChange={() => setIsNumeral(!isNumeral)} type='checkbox' value='' id='posNoun' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500' />
                                            <label className='form-check-label inline-block text-gray-800 dark:text-inherit' htmlFor='posNoun'>
                                                Numeral
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* onyomi */}
                    <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='onyomi' className='text-sm font-medium text-gray-700 dark:text-inherit'>On'yomi</label>
                            <div className='mt-1'>
                                <MultiInput value={onyomi} onChange={setOnyomi} kana={true} />
                            </div>
                        </div>
                    </div>
                    {/* kunyomi */}
                    <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='kunyomi' className='text-sm font-medium text-gray-700 dark:text-inherit'>Kun'yomi</label>
                            <div className='mt-1'>
                                <MultiInput value={kunyomi} onChange={setKunyomi} kana={true} />
                            </div>
                        </div>
                    </div>
                    {/* emphasis */}
                    <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='emphasis' className='text-sm font-medium text-gray-700 dark:text-inherit'>Emphasis</label>
                            <div className='mt-1'>
                                <fieldset>
                                    <div>
                                        <input type='radio' id='emphasis-onyomi' name='emphasis' value='onyomi'
                                            checked={(emphasis == 'onyomi') ? true : false}
                                            onChange={(e) => setEmphasis(e.target.value)}
                                            className='dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500'
                                        />
                                        <label htmlFor='emphasis-onyomi' className='p-2 dark:text-inherit'>On'yomi</label>
                                    </div>

                                    <div>
                                        <input type='radio' id='emphasis-kunyomi' name='emphasis' value='kunyomi'
                                            checked={(emphasis == 'kunyomi') ? true : false}
                                            onChange={(e) => setEmphasis(e.target.value)}
                                            className='dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500'
                                        />
                                        <label htmlFor='emphasis-kunyomi' className='p-2 dark:text-inherit'>Kun'yomi</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {(itemType !== '' ? <div className='mb-6 h-px'></div> : '')}
                <fieldset className={`border p-3 mb-3 ${itemType ? '' : 'hidden'}`}>
                    <legend>Related Items</legend>
                    {/* kanji -- vocab,  */}
                    <div className={`flex items-center mb-3 ${['vocab', 'radical', 'kanavocab'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-inherit'>Kanji</label>
                            <div className='mt-1'>
                                <ItemSearch value={kanji} deckId={props.deckId} type='kanji' onChange={setKanji} />
                            </div>
                        </div>
                    </div>
                    {/* radicals -- kanji,  */}
                    <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='radicals' className='text-sm font-medium text-gray-700 dark:text-inherit'>Radicals</label>
                            <div className='mt-1'>
                                <ItemSearch value={radicals} deckId={props.deckId} type='radical' onChange={setRadicals} />
                            </div>
                        </div>
                    </div>
                    {/* vocabulary -- kanji,  */}
                    <div className={`flex items-center mb-3 ${itemType == 'kanji' ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='vocabulary' className='text-sm font-medium text-gray-700 dark:text-inherit'>Vocabulary (search w/ english or hiragana)</label>
                            <div className='mt-1'>
                                <ItemSearch value={vocabulary} deckId={props.deckId} type='vocab' onChange={setVocabulary} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                {/* meaning mnemonic kanji,*/}
                <fieldset className={`border p-3 mb-3 ${itemType ? '' : 'hidden'}`}>
                    <legend>Explanations</legend>
                    <div className={`flex items-center mb-3 ${itemType ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Meaning Explanation
                            </label>
                            <div className='mt-1'>
                                <textarea
                                    name='description'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    maxLength={500}
                                    value={mmne}
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
                            <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-inherit'>Meaning Hint</label>
                            <div className='mt-1'>
                                <textarea
                                    name='description'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    maxLength={500}
                                    value={meaningHint}
                                    onChange={e => {
                                        setMeaningHint(e.target.value)
                                    }}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    {/* reading mnemonic -- kanji,*/}
                    <div className={`flex items-center mb-3 ${['vocab', 'kanji'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Reading Explanation
                            </label>
                            <div className='mt-1'>
                                <textarea
                                    name='description'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    maxLength={500}
                                    value={rmne}
                                    onChange={e => {
                                        setRmne(e.target.value)
                                    }}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    {/* reading hint -- kanji,  */}
                    <div className={`flex items-center mb-3 ${['vocab', 'kanji'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-inherit'>Reading Hint</label>
                            <div className='mt-1'>
                                <textarea
                                    name='description'
                                    className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                    maxLength={500}
                                    value={readingHint}
                                    onChange={e => {
                                        setReadingHint(e.target.value)
                                    }}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className={`border p-3 mb-3 ${itemType ? '' : 'hidden'}`}>
                    <legend>Auxiliary</legend>
                    {/* auxilary meanings - vocab,kanji */}
                    <div className={`flex items-center mb-3`}>
                        <div className='flex-grow'>
                            <label htmlFor='kana' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Auxiliary Meanings (whitelist)
                            </label>
                            <div className='mt-1'>
                                <MultiInput value={(auxMeanings || []).map((aux) => aux.meaning || aux.reading)} onChange={setAuxMeanings} />
                            </div>
                        </div>
                    </div>
                    {/* auxilary readings - vocab,kanji */}
                    <div className={`flex items-center mb-3 ${['vocab', 'kanji'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                        <div className='flex-grow'>
                            <label htmlFor='kana' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                                Auxiliary Readings (whitelist)
                            </label>
                            <div className='mt-1'>
                                <MultiInput value={(auxReadings || []).map((aux) => aux.meaning || aux.reading)} onChange={setAuxReadings} kana={true} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                {/* audio files - vocab */}
                <div className={`flex items-center mb-3 ${itemType == 'vocab' ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='aud' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                            Audio File (url)
                        </label>
                        <div className='mt-1'>
                            <input
                                name='aud'
                                type='text'
                                className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setAud(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* ctx1 - vocab */}
                <div className={`flex items-center mb-3 ${['vocab'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='ctx1jap' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                            Context Sentence #1 (日本語)
                        </label>
                        <div className='mt-1'>
                            <input
                                name='ctx1jap'
                                type='text'
                                className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setCtx1jap(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* ctx1 - vocab */}
                <div className={`flex items-center mb-3 ${['vocab'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='ctx1' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                            Context Sentence #1 (English)
                        </label>
                        <div className='mt-1'>
                            <input
                                name='ctx1'
                                type='text'
                                className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setCtx1(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* ctx1 - vocab */}
                <div className={`flex items-center mb-3 ${['vocab'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='ctx2jap' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                            Context Sentence #2 (日本語)
                        </label>
                        <div className='mt-1'>
                            <input
                                name='ctx2jap'
                                type='text'
                                className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setCtx2jap(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* ctx2 - vocab */}
                <div className={`flex items-center mb-3 ${['vocab'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                    <div className='flex-grow'>
                        <label htmlFor='ctx2' className='text-sm font-medium text-gray-700 dark:text-inherit'>
                            Context Sentence #2 (English)
                        </label>
                        <div className='mt-1'>
                            <input
                                name='ctx2'
                                type='text'
                                className='border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-slate-500 dark:focus:outline-none dark:focus:ring-slate-500 w-full'
                                placeholder=''
                                onChange={(e) => {
                                    setCtx2(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={`text-center mt-8 ${['vocab', 'kanavocab', 'radical', 'kanji'].indexOf(itemType) != -1 ? '' : 'hidden'}`}>
                    <button
                        type='button'
                        className='text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                        onClick={submit}
                    >
                        <div className='mr-1 inline'>
                            <span>{eitm ? '>' : '+'}</span>
                            <span className='hidden'>
                                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                        {eitm ? 'save' : 'create'} {itemType}
                    </button>
                </div >
            </div >
        </div >
    )
}
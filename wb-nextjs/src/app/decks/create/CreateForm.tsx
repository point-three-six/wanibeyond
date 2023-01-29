'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../../styles/checkmark.css'

export default function CreateForm() {
    const router = useRouter()

    const nameMaxLength = 45;
    const descMaxLength = 300;

    let [name, setName] = useState('');
    let [nameValidated, setNameValidated] = useState(false);

    let [desc, setDesc] = useState('');
    let [descValidated, setDescValidated] = useState(true);

    let [isPrivate, setIsPrivate] = useState(false);
    let [isPrivateValidated, setIsPrivateValidated] = useState(false);

    let [allowForking, setAllowForking] = useState(false);
    let [allowForkingValidated, setAllowForkingValidated] = useState(false);

    let [levelSystem, setLevelSystem] = useState(false);
    let [levelSystemValidated, setLevelSystemValidated] = useState(false);

    let [url, setUrl] = useState('');
    let [urlValidated, setUrlValidated] = useState(true);

    function validateName(value: string) {
        let name = value.trim();

        if (name.length >= 3 && name.length <= nameMaxLength) {
            setName(name);
            setNameValidated(true);
        } else {
            setNameValidated(false);
        }
    }

    function validateDesc(value: string) {
        let body = value.trim();

        if (body.length >= 0 && body.length <= descMaxLength) {
            setDesc(body);
            setDescValidated(true);
        }
    }

    function validateUrl(value: string) {
        value = value.trim();
        if (value.length == 0) {
            setUrlValidated(true);
        } else {
            try {
                let url = new URL(value);
                setUrlValidated(url.host == 'community.wanikani.com');
            } catch (e) {
                setUrlValidated(false);
            }
        }
    }

    function validatePrivacy(value: string) {
        if (['yes', 'no'].indexOf(value) != -1) {
            let isPrivate = (value == 'yes') ? true : false;
            setIsPrivate(isPrivate);
            setIsPrivateValidated(true);
        } else {
            setIsPrivateValidated(false);
        }
    }

    function validateForking(value: string) {
        if (['yes', 'no'].indexOf(value) != -1) {
            let allow = (value == 'yes') ? true : false;
            setAllowForking(allow);
            setAllowForkingValidated(true);
        } else {
            setAllowForkingValidated(false);
        }
    }

    function validateLevelSystem(value: string) {
        if (['wanikani', 'internal'].indexOf(value) != -1) {
            setLevelSystem(value);
            setLevelSystemValidated(true);
        } else {
            setLevelSystemValidated(false);
        }
    }

    async function sendRequest(url, arg) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
    }

    function submit() {
        sendRequest('/api/deck/create', {
            name: name,
            desc: desc,
            privacy: isPrivate,
            forking: allowForking,
            threadUrl: url,
            levelSystem: levelSystem
        }).then(async (res) => {
            let r = await res.json();
            if (res.status == 200 && 'id' in r) {
                router.refresh();
                router.push(`/decks/${r.id}/edit`)
            }
        })
    }

    return (
        <div>
            <div className='flex items-center mb-3'>
                <div className={`circle mr-6 ${(nameValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(nameValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='deckName' className='text-sm font-medium text-gray-700'>Name</label>
                    <div className='mt-1'>
                        <input
                            name='deckName'
                            type='text'
                            className='border border-gray-300 w-full'
                            maxLength={nameMaxLength}
                            placeholder='My deck name'
                            onChange={e => {
                                validateName(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex items-center mb-3 ${(nameValidated) ? '' : 'hidden'}`}>
                <div className={`circle mr-6 ${(isPrivateValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(isPrivateValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='privacy' className='text-sm font-medium text-gray-700'>Privacy</label>
                    <div className='mt-1'>
                        <select
                            name='privacy'
                            className='border border-gray-300 w-full'
                            defaultValue={''}
                            onChange={e => {
                                validatePrivacy(e.target.value)
                            }}
                        >
                            <option value=''></option>
                            <option value='no'>Listed: Anyone can see & use my deck.</option>
                            <option value='yes'>Private: Only I can see & use my deck.</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={`flex items-center mb-3 ${(nameValidated && isPrivateValidated) ? '' : 'hidden'}`}>
                <div className={`circle mr-6 ${(allowForkingValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(allowForkingValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='allowForking' className='text-sm font-medium text-gray-700'>Allow Forking</label>
                    <div className='mt-1'>
                        <select
                            name='allowForking'
                            className='border border-gray-300 w-full'
                            defaultValue={'value'}
                            onChange={e => {
                                validateForking(e.target.value)
                            }}
                        >
                            <option value=''></option>
                            <option value='yes'>Yes: Anyone can clone a copy of my deck.</option>
                            <option value='no'>No: Nobody can clonse a copy of my deck.</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={`flex items-center mb-3 ${(nameValidated && isPrivateValidated && allowForkingValidated) ? '' : 'hidden'}`}>
                <div className={`circle mr-6 ${(levelSystemValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(levelSystemValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='levelSystem' className='text-sm font-medium text-gray-700'>Level System</label>
                    <div className='mt-1'>
                        <select
                            name='levelSystem'
                            className='border border-gray-300 w-full'
                            defaultValue={'value'}
                            onChange={e => {
                                validateLevelSystem(e.target.value)
                            }}
                        >
                            <option value=''></option>
                            <option value='wanikani'>WaniKani: The user's WaniKani level is used.</option>
                            <option value='internal'>Internal: The user's internal deck level is used.</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <div className={`flex items-center mb-3 ${(nameValidated && isPrivateValidated && allowForkingValidated) ? '' : 'hidden'}`}>
                <div className={`circle mr-6 ${(urlValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(urlValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='threadUrl' className='text-sm font-medium text-gray-700'>WaniKani Thread URL (optional)</label>
                    <div className='mt-1'>
                        <input
                            name='threadUrl'
                            type='text'
                            className='border border-gray-300 w-full'
                            maxLength={250}
                            placeholder='https://community.wanikani.com/....'
                            onChange={e => {
                                validateUrl(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div> */}
            <div className={`flex items-center mb-3 ${(nameValidated && isPrivateValidated && allowForkingValidated && urlValidated && levelSystemValidated) ? '' : 'hidden'}`}>
                <div className={`circle mr-6 ${(descValidated) ? 'checked' : ''}`}>
                    <div className={`checkmark ${(descValidated) ? '' : 'hidden'}`}></div>
                </div>
                <div className='flex-grow'>
                    <label htmlFor='description' className='text-sm font-medium text-gray-700'>Short Description</label>
                    <div className='mt-1'>
                        <textarea
                            name='description'
                            className='border border-gray-300 w-full'
                            maxLength={descMaxLength}
                            placeholder='An optional descripton . . .'
                            onChange={e => {
                                validateDesc(e.target.value)
                            }}
                        >
                        </textarea>
                    </div>
                </div>
            </div>
            <div className={`text-center mt-8 ${(nameValidated && isPrivateValidated && allowForkingValidated && levelSystemValidated && descValidated) ? '' : 'hidden'}`}>
                <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
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
                    create deck
                </button>
            </div >
        </div >
    )
}

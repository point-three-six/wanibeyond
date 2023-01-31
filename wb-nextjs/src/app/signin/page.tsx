'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import sendExtMsg from '../../lib/wpExtension';

export default function page() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendRequest(url, arg) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
    }

    const login = () => {
        sendRequest('/api/auth/login', {
            email: email,
            password: password
        }).then(async (res) => {
            if (res.status == 200) {
                let data = await res.json();

                const token = data.token;

                setCookie('wp_session', token, {
                    path: '/',
                    maxAge: 3600 * 24 * 7 * 30,
                    sameSite: 'lax'
                });

                // if they have the extension installed
                // tell it to sync
                sendExtMsg('sync', true, () => { });

                router.refresh();
                router.push('/');
            } else {
                console.log(res);
                // setError
            }
        })
    }

    return (
        <>
            <div className="flex page-width min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign In
                        </h2>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={e => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    min={3}
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={e => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={login}
                            >
                                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span> */}
                                Sign In
                            </button>
                        </div>
                    </div>

                    <div className='mt-4'>
                        Alternatively, <Link href='/signup' className='text-blue-400'>create your account now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

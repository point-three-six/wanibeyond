'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function page() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function sendRequest(url, arg) {
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
    }

    const register = () => {
        sendRequest('/api/auth/create', {
            email: email,
            username: username,
            password: password
        }).then(async (res) => {
            if (res.status == 200) {
                let data = await res.json();

                const token = data.token;

                setCookie('wp_session', token, {
                    path: '/',
                    maxAge: 3600 * 24 * 7 * 30, // Expires after 1hr
                    sameSite: true
                });

                router.refresh();
                router.push('/')
            }
        })
    }

    return (
        <>
            <div className="flex w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/* <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        /> */}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-inherit">
                            Create Account
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
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-inherit placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={e => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    min={3}
                                    max={15}
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-inherit placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Username"
                                    onChange={e => {
                                        setUsername(e.target.value)
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
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-inherit placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                onClick={register}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className='mt-4'>
                            Already have an account? <Link href='/signin' className='text-blue-400'>Sign in now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

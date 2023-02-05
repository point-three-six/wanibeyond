'use client';

import React, { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export default function ThemeButton(props) {
    let [theme, setTheme] = useState('');

    useEffect(() => {
        console.log(getCookie('wp_theme'))
        let userTheme = getCookie('wp_theme') || 'light';
        setTheme(userTheme);
    });

    function switchTheme() {
        let toTheme = (theme == 'dark') ? 'light' : 'dark';

        setCookie('wp_theme', toTheme, {
            path: '/',
            maxAge: 3600 * 24 * 7 * 30,
            sameSite: 'lax'
        });

        setTheme(toTheme);

        let el = document.documentElement;
        if (toTheme == 'dark') {
            el.classList.add('dark');
        } else {
            el.classList.remove('dark');
        }
    }

    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"
                    onClick={() => switchTheme()}
                    onChange={() => { }}
                    checked={(theme == 'dark') ? true : false} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
            </label>
        </>
    )
}

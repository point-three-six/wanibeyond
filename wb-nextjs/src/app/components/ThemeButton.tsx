'use client';

import React, { useState } from 'react';

export default function ThemeButton(props) {
    let [theme, setTheme] = useState(localStorage.getItem('theme')
        || ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'));

    function switchTheme() {
        let toTheme = theme == 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', toTheme);

        let el = document.documentElement;
        if (toTheme == 'dark') {
            el.classList.add('dark');
        } else {
            el.classList.remove('dark');
        }

        setTheme(toTheme);
    }

    return (
        <>
            <div className='flex grow justify-center text-center'>
                <label id='theme-switch' onClick={switchTheme} className='relative inline-flex items-center cursor-pointer'>
                    <input type="checkbox" value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className='ml-3 text-white dark:text-inherit'>
                        <span id='selector-theme'>
                            Dark
                        </span>
                    </span>
                </label>
            </div>
        </>
    )
}

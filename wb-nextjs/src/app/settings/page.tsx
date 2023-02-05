import React from 'react'
import ThemeButton from '../components/ThemeButton';

export default function Page() {
    return (
        <div className='max-width'>
            <h1 className="text-4xl font-extrabold text-slate-700 dark:text-inherit mb-5">Settings</h1>
            <div>
                <div className='font-bold text-md text-slate-700 dark:text-inherit'>
                    Theme
                </div>
                <ThemeButton />
            </div>
        </div>
    )
}
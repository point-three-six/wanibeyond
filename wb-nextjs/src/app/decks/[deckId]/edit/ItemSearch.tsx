'use client';

import React from 'react';
import AsyncSelect from 'react-select/async';

async function getItems(input: string) {
    if (!input) return [];
    const response = await fetch('/api/native/get?type=radical&item=' + input)
    const data = await response.json()

    if (response.status == 200) {
        let options = [];

        for (let item of data) {
            options.push({
                label: item.characters,
                value: item.en.toLowerCase()
            });
        }

        console.log(input, options)
        return options;
    } else {
        return [];
    }
}

const promiseOptions = async (inputValue: string) => await getItems(inputValue);

export default () => (
    <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: 0,
                borderColor: 'rgb(209 213 219 / 1)',
                boxShadow: '',
                ':active': {
                    ...baseStyles[':active'],
                    borderColor: ''
                },
                ':hover': {
                    ...baseStyles[':hover'],
                    borderColor: '',
                    boxShadow: ''
                }
            }),
            input: (baseStyles, state) => ({
                ...baseStyles,
                outline: '0px !important'
            })
        }}
    />
);
'use client';

import React from 'react';
import AsyncSelect from 'react-select/async';

export default function ItemSearch(props) {

    async function getItems(input: string) {
        if (!input) return [];

        const response = await fetch(`/api/items/get?type=${props.type}&item=${input}&deckId=${props.deckId}`)
        const data = await response.json();

        if (response.status == 200) {
            return data.map(item => {
                return {
                    label: item.en + ' (' + item.characters + ')',
                    value: item.id
                }
            });
        }

        return [];
    }

    function getColor() {
        if (props.type == 'kanji') return 'rgb(245, 153, 168)';
        if (props.type == 'radical') return 'rgb(143, 205, 234)';
        if (props.type == 'vocab') return 'rgb(219, 148, 233)';
        return 'gainsboro';
    }

    const promiseOptions = async (inputValue: string) => await getItems(inputValue);

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            value={props.value}
            onChange={(value) => {
                props.onChange(value)
            }}
            placeholder='Search items...'
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
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? 'black' : 'inherit',
                    backgroundColor: state.isFocused ? '#83bfee' : ''
                }),
                multiValue: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: 'transparent'
                }),
                multiValueLabel: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: getColor(),
                    borderRadius: 0
                }),
                multiValueRemove: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: 0,
                    backgroundColor: getColor(),
                    color: 'black'
                })
            }}
            classNames={{
                control: (state) =>
                    'dark:bg-neutral-800 dark:border-neutral-700',
                input: () => 'dark:text-inherit',
                menu: () => 'dark:bg-neutral-800 dark:text-inherit',
                //option: () => 'hover:bg-sky-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-700 dark:focus:bg-neutral-700',
                multiValueLabel: () => 'rounded-sm rounded-r-none',
                multiValueRemove: () => 'rounded-sm rounded-l-none'
            }}
        />
    );
}
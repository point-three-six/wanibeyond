'use client';

import React from 'react';
import AsyncSelect from 'react-select/async';

export default function ItemSearch(props) {
    let isSearchActive: boolean = false;
    let searchResults: any[] = [];

    async function getItems(input: string) {
        if (!input) return [];

        const response = await fetch(`/api/items/get?type=${props.type}&item=${input}&deckId=${props.deckId}`)
        const data = await response.json()

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
        if (props.type == 'radical') return 'rgb(143, 205, 234)';
        if (props.type == 'vocab') return 'rgb(219, 148, 233)';
        return 'gainsboro';
    }

    const createOption = (label: string) => ({
        label,
        value: label,
    });

    function buildOptions(arr) {
        if (!arr) return [];
        return arr.map(val => createOption(val));
    }

    const promiseOptions = async (inputValue: string) => await getItems(inputValue);

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            value={buildOptions(props.value)}
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
                multiValueLabel: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: getColor()
                }),
                multiValueRemove: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: getColor()
                })
            }}
        />
    );
}
'use client';

import React from 'react';
import AsyncSelect from 'react-select/async';

export default function ItemSearch(props) {

    async function getItems(input: string) {
        if (!input) return [];
        console.log(`/api/items/get?type=${props.type}&item=${input}&deckId=${props.deckId}`)
        const response = await fetch(`/api/items/get?type=${props.type}&item=${input}&deckId=${props.deckId}`)
        const data = await response.json()

        if (response.status == 200) {
            let options = [];

            for (let item of data) {
                options.push({
                    label: item.en + ' (' + item.characters + ')',
                    value: item.id
                });
            }

            return options;
        } else {
            return [];
        }
    }

    function getColor() {
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
            onChange={(value) => {
                let cleanedVals = [];
                for (let item of value) {
                    cleanedVals.push(item.value);
                }
                props.onChange(cleanedVals)
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
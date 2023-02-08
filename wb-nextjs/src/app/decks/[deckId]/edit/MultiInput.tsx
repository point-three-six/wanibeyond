'use client';

import React, { KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

function buildOptions(arr) {
    if (!arr) return [];
    let options = [];
    for (let val of arr) {
        options.push(createOption(val));
    }
    return options;
}

export default (props) => {
    let value = props.value;

    const [inputValue, setInputValue] = React.useState('');
    const [myValue, setMyValue] = React.useState(buildOptions(value));

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // check for dupes
                for (let option of myValue) {
                    if (option.value == inputValue) {
                        return;
                    }
                }

                // this is updating the value of props.value/value
                props.onChange((prev) => [...prev, inputValue]);
                setMyValue([...myValue, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    return (
        <CreatableSelect
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(newValue) => {
                console.log('newValues')
                console.log(newValue)
                props.onChange(newValue);
                setMyValue(newValue);
            }}
            onInputChange={(newValue) => {
                if (props.kana) newValue = wanakana.toKana(newValue);
                setInputValue(newValue)
            }}
            onKeyDown={handleKeyDown}
            placeholder='Type and press enter for each value...'
            value={myValue}
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
            classNames={{
                control: (state) =>
                    'dark:bg-neutral-800 dark:border-neutral-700',
                input: () => 'dark:text-inherit'
            }}
        />
    );
};
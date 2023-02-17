'use client';

export default function Mapper(props) {
    let defaultWpFields = {
        'en': {
            field: 'English',
            required: true,
            types: ['radical', 'kanji', 'vocab']
        },
        'characters': {
            field: 'Japanese',
            required: true,
            types: ['radical', 'kanji', 'vocab']
        },
        'onyomi': {
            field: 'Onyomi',
            types: ['kanji']
        },
        'kunyomi': {
            field: 'Kunyomi',
            types: ['kanji']
        },
        'emph': {
            field: 'Emphasis',
            types: ['kanji']
        },
        'kana': {
            field: 'Reading',
            required: true,
            types: ['vocab']
        },
        'mmne': {
            field: 'Meaning Explanation',
            types: ['radical', 'kanji', 'vocab']
        },
        'mhnt': {
            field: 'Meaning Hint',
            types: ['radical', 'kanji', 'vocab']
        },
        'rmne': {
            field: 'Reading Explanation',
            types: ['kanji', 'vocab']
        },
        'rhnt': {
            field: 'Reading Hint',
            types: ['kanji', 'vocab']
        },
        'parts_of_speech': {
            field: 'Part of Speech',
            types: ['vocab']
        }
    };

    let fields = Object.keys(defaultWpFields).filter(field => defaultWpFields[field].types.indexOf(props.itemType) !== -1);
    let required = fields.filter(field => defaultWpFields[field].required);

    let mappings = props.mappings;

    function areRequiredFieldsMapped() {
        let mapped = required.filter(field => field in mappings);
        props.onAllRequiredFieldsMapped(mapped.length === required.length);
    }

    function columnSelected(e) {
        let field = e.target.name;
        let columnIdx = parseInt(e.target.value);

        if (columnIdx >= 0) {
            mappings[field] = columnIdx;
        } else {
            delete mappings[field];
        }

        props.onMappingsUpdated(mappings);

        areRequiredFieldsMapped();
    }

    return (
        <>
            <table className='table-auto text-left border-y-2 w-full mt-4' cellPadding={4}>
                <thead className='my-2'>
                    <tr>
                        <th>Field</th>
                        <th>Column</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, i) => {
                        return (

                            <tr key={i}>
                                <td>
                                    {defaultWpFields[field].field}
                                    {defaultWpFields[field].required ? <span className='text-orange-600 px-1'>*</span> : ''}
                                </td>
                                <td>
                                    <select name={field} onChange={columnSelected}>
                                        <option value='-1'></option>
                                        {
                                            props.columns.map((column, i) =>
                                                <option key={i} value={i}>{column}</option>
                                            )
                                        }
                                    </select>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

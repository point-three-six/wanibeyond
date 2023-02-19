export default function SpecialColumnsList() {

    function code(text) {
        return (
            <span className='my-4 text-sm bg-neutral-100 p-2 dark:bg-neutral-700 dark:text-inherit'>{text}</span>
        );
    }

    return (
        <>
            <div>
                <div className='mb-10'>
                    <div className='mb-3 font-bold'>
                        <a id='waniplus_id'>
                            {code('waniplus_id')}
                        </a>
                    </div>
                    <div className='pl-3'>
                        <div className='mb-3'>
                            Indicates that you do not want to create a new item, but instead want to update an existing item.
                        </div>
                        <div>
                            The value provided should be a numerical value representing the ID of the existing WaniPlus item.
                        </div>
                    </div>
                </div>
                <div className='mb-10'>
                    <div className='mb-3 font-bold'>
                        <a id='waniplus_srs'>
                            {code('waniplus_srs')}
                        </a>
                    </div>
                    <div className='pl-3'>
                        <div className='mb-3'>
                            By default, items created in WaniPlus start a the lowest SRS stage possible, {code(1)}.
                        </div>
                        <div className='mb-3'>
                            This will set <i>your</i> default SRS level for the item. This effect will not carry over for anyone who installs your deck.
                        </div>
                        <div>
                            The value provided should be a number between 1-9.
                        </div>
                    </div>
                </div>
                <div className='mb-10'>
                    <div className='mb-3 font-bold'>
                        <a id='waniplus_level'>
                            {code('waniplus_level')}
                        </a>
                    </div>
                    <div className='pl-3'>
                        <div className='mb-3'>
                            Automatically assign what level the item should be available at.
                        </div>
                        <div>
                            The value provided should be a number between 1-999.
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div className='mb-3 font-bold'>
                        <a id='waniplus_type'>
                            {code('waniplus_type')}
                        </a>
                    </div>
                    <div className='pl-3'>
                        <div className='mb-3'>
                            The value of this column indicates what type of WaniPlus item is represented. This will override whatever item type was chosen in the import options.
                        </div>

                        <ul className='list-inside list-disc'>
                            <li className='my-4'>{code('radical')}</li>
                            <li className='my-4'>{code('kanji')}</li>
                            <li className='my-4'>{code('vocabulary')}</li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </>
    )
}

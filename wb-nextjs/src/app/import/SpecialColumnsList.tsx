export default function SpecialColumnsList() {

    return (
        <div>
            <table className='table-auto text-left border-y-2 w-full' cellPadding={4}>
                <thead className='my-2'>
                    <tr>
                        <th>Column</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span className='bg-neutral-100 p-1'>waniplus_type</span>
                        </td>
                        <td>
                            <div className='mb-3'>
                                The value of this column indicates what type of WaniPlus item is represented. This will override whatever item type was chosen in the import options.
                            </div>

                            <ul className='list-inside list-disc'>
                                <li className='my-2'><span className='bg-neutral-100 p-1'>radical</span></li>
                                <li className='my-2'><span className='bg-neutral-100 p-1'>kanji</span></li>
                                <li className='my-2'><span className='bg-neutral-100 p-1'>vocabulary</span></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

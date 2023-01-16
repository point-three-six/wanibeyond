import prisma from '../../../../../lib/prisma';
import '../../../../../styles/editor.css';

export default async function ItemPage({ params }) {
    let itemId = parseInt(params.itemId);
    let deckId = parseInt(params.deckId);

    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            isPrivate: false
        },
        include: {
            items: {
                where: {
                    id: itemId,
                },
                take: 1
            }
        }
    });
    const item = deck.items[0] || null;

    return (
        <>
            <div className='max-width'>
                {
                    item ?
                        <>
                            <div className='text-center'>
                                <div className={`item ${item.type} super w-full`}>
                                    <div className='chars'>
                                        {item.characters}
                                    </div>
                                    <div className='meaning'>
                                        {item.en}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='font-medium text-gray-700 mt-6 mb-2'>
                                    Type
                                </div>
                                {item.type.toUpperCase()}
                            </div>
                            <div>
                                <div className='font-medium text-gray-700 mt-6 mb-2'>
                                    Meanings
                                </div>
                                {(item.data.en.map(item => item.toUpperCase())).join(',')}
                            </div>
                            <div>
                                <div className='font-medium text-gray-700 mt-6 mb-2'>
                                    Meaning Mnemonic
                                </div>
                                {item.data.mmne}
                            </div>
                            {
                                item.data.mhnt ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2'>
                                            Meaning Hint
                                        </div>
                                        {item.data.mhnt}
                                    </div>
                                    : ''
                            }
                            {
                                item.data.rmne ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2'>
                                            Reading Mnemonic
                                        </div>
                                        {item.data.rmne}
                                    </div>
                                    : ''
                            }
                            {
                                item.data.rhnt ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2'>
                                            Reading Hint
                                        </div>
                                        {item.data.rhnt}
                                    </div>
                                    : ''
                            }
                        </>
                        :
                        'not found'
                }
            </div>
        </>
    )
}
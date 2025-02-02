import prisma from '../../../../../lib/prisma';
import { getSession } from '../../../../../lib/session';
import injectItemData from '../../../../../lib/itemInjector';
import '../../../../../styles/editor.css';

export default async function ItemPage({ params }) {
    let itemId = parseInt(params.itemId);
    let deckId = parseInt(params.deckId);

    let sessionData = await getSession();
    let userId = (typeof sessionData.id == 'undefined') ? -1 : sessionData.id;

    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            OR: [
                {
                    isPrivate: false
                },
                {
                    isPrivate: true,
                    userId: userId
                }
            ]
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

    let item = null;
    if (deck && deck.items.length > 0) {
        item = deck.items[0] || null;

        let injected = await injectItemData(item.data);
        item.data = injected;
    }

    return (
        <>
            <div className='max-width'>
                {
                    deck && item ?
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
                                <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                    Meanings
                                </div>
                                {(item.data.en.map(item => item.toUpperCase())).join(',')}
                            </div>
                            <div>
                                <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                    Meaning Explanation
                                </div>
                                {item.data.mmne}
                            </div>
                            {
                                item.data.mhnt ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Meaning Hint
                                        </div>
                                        {item.data.mhnt}
                                    </div>
                                    : ''
                            }
                            {
                                item.data.rmne ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Reading Explanation
                                        </div>
                                        {item.data.rmne}
                                    </div>
                                    : ''
                            }
                            {
                                item.data.rhnt ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Reading Hint
                                        </div>
                                        {item.data.rhnt}
                                    </div>
                                    : ''
                            }
                            {
                                item.data.radicals ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Related Radicals
                                        </div>
                                        <div className='items flex gap-2'>
                                            {
                                                item.data.radicals.map(item =>
                                                    <div key={item.id} className={`item small radical`}>
                                                        {item.rad}
                                                        <div className='meaning text-xs'>
                                                            {item.en}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                item.data.kanji ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Related Kanji
                                        </div>
                                        <div className='items flex gap-2'>
                                            {
                                                item.data.kanji.map(item =>
                                                    <div key={item.id} className={`item small kanji`}>
                                                        {item.kan}
                                                        <div className='meaning text-xs'>
                                                            {item.en}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                item.data.vocabulary ?
                                    <div>
                                        <div className='font-medium text-gray-700 mt-6 mb-2 dark:text-inherit'>
                                            Related Vocabulary
                                        </div>
                                        <div className='items flex gap-2'>
                                            {
                                                item.data.vocabulary.map(item =>
                                                    <div key={item.id} className={`item small vocab`}>
                                                        {item.ja}
                                                        <div className='meaning text-xs'>
                                                            {item.en}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    : ''
                            }
                        </>
                        :
                        <div className='text-center'>
                            This item does not exist or is private.
                        </div>
                }
            </div>
        </>
    )
}
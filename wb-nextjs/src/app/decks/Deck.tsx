import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

export default async function Deck(props) {
    return (
        <>
            {
                <div key={props.deck.id} className='flex justify-between flex-col bg-gray-200 text-black dark:bg-neutral-700 dark:text-inherit rounded border-bottom shadow-md'>
                    <div className='flex-1 m-4'>
                        <Link href={`/decks/${props.deck.id}`}>
                            <div className='font-bold text-xl'>
                                {props.deck.name}
                            </div>
                        </Link>
                        {props.deck.description}
                    </div>
                    <div className='bg-gray-300 dark:bg-neutral-800 rounded-b text-sm text-center p-2'>
                        <span className='display-inline mr-3' title='Deck author'><FontAwesomeIcon icon={faCircleUser} /> {props.deck.user.username}</span>
                        <span title='Number of items'><FontAwesomeIcon icon={faHashtag} /> {props.deck._count.items}</span>
                    </div>
                </div>
            }
        </>
    )
}

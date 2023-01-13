import Link from 'next/link';

export default async function Deck(props) {
    return (
        <>

            {
                <div key={props.deck.id} className='bg-slate-400 p-4 rounded text-white'>
                    <div className='font-bold text-xl md:grid-cols-2'>
                        <Link href={`/decks/${props.deck.id}/edit`}>{props.deck.name}</Link>
                    </div>
                    {props.deck.description}
                </div>
            }
        </>
    )
}

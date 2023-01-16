import Link from 'next/link';
import '../../../styles/editor.css';

export default function ItemList(props) {
    const generateLevels = (items) => {
        let lvls = items.map(item => item.level)
            .filter((e, i, arr) => arr.indexOf(e) === i)
            .sort()
        return (lvls.length > 0) ? lvls : [0];
    }

    function getItemTitle(item) {
        if (item.type == 'radical') return item.data.rad;
        if (item.type == 'kanji') return item.data.kan;
        if (item.type == 'vocab') return item.data.voc;
        if (item.type == 'kanavocab') return item.data.characters;
        return '';
    }

    const levels = generateLevels(props.items);

    return (
        <div className='w-full'>
            {
                levels.map(level =>
                    <div id={`level-${level}`} key={level}>
                        <div className='flex items-center'>
                            <div className='flex-grow h-px bg-gray-400'></div>
                            <span className='flex-shrink text-lg text-slate-500 px-4 font-light'>
                                {level == 0 ? 'Any level' : `Level ${level}`}
                            </span>
                            <div className='flex-grow h-px bg-gray-400'></div>
                        </div>
                        <div className='items flex gap-2'>
                            {props.items
                                .filter(item => item.level == level)
                                .map(item =>
                                    <Link key={item.id} href={`/decks/${props.deckId}/item/${item.id}/`}>
                                        <div className={`item ${item.type}`}>
                                            {getItemTitle(item)}
                                            <div className='meaning text-xs'>
                                                {item.data.en[0]}
                                            </div>
                                        </div>
                                    </Link>
                                )}
                        </div>
                    </div>
                )
            }
        </div>
    )
}


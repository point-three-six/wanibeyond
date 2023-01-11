import ItemList from './ItemList';
import prisma from '../../../lib/prisma';

export default async function DeckPage({ params: { deckId } }) {
  let id = parseInt(deckId);
  const deck = await prisma.deck.findFirst({
    where: {
      id: id
    },
    include: {
      user: {
        select: {
          username: true
        }
      },
      items: {
        where: {
          deleted: false,
        },
        select: {
          id: true,
          data: true,
          level: true,
          type: true
        }
      }
    }
  });

  return (
    <>
      <div className='max-width'>
        <div>
          <div className='font-bold text-xl text-slate-700'>
            {deck.name}
          </div>
          Created by {deck.user.username}
        </div>
        <ItemList items={deck.items} />
      </div>
    </>
  )
}
import ItemList from './ItemList';
import prisma from '../../../lib/prisma';
import InstallButton from '../../components/InstallButton';

export default async function DeckPage({ params: { deckId } }) {
  let id = parseInt(deckId);
  const deck = await prisma.deck.findFirst({
    where: {
      id: id,
      isPrivate: false
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
        },
        orderBy: [
          {
            level: 'asc'
          },
          {
            id: 'asc'
          }
        ]
      }
    }
  });

  return (
    <>
      <div className='max-width'>
        <div className='flex justify-between mb-5'>
          <div>
            <div className='font-bold text-xl text-slate-700'>
              {deck.name}
            </div>
            Created by {deck.user.username}
          </div>
          <div>
            <InstallButton deckId={deck.id} />
          </div>
        </div>
        <ItemList deckId={deck.id} items={deck.items} />
      </div>
    </>
  )
}
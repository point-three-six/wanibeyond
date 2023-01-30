import ItemList from './ItemList';
import prisma from '../../../lib/prisma';
import InstallButton from '../../components/InstallButton';
import { getSession } from '../../../lib/session';

export default async function DeckPage({ params: { deckId } }) {
  let id = parseInt(deckId);
  let sessionData = await getSession();

  let userId = (typeof sessionData.id == 'undefined') ? -1 : sessionData.id;

  const deck = await prisma.deck.findFirst({
    where: {
      id: id,
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
      {deck ?
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
        :
        <div className='max-width'>
          <div className='text-center'>
            This deck does not exist or is private.
          </div>
        </div>
      }
    </>
  )
}
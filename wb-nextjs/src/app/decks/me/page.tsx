import MyDeckList from './MyDeckList';
import prisma from '../../../lib/prisma'
import { getSession } from '../../../lib/session'

export default async function DeckListPage() {
  let sessionData = await getSession();

  let myDecks;
  if (Object.keys(sessionData).length > 0) {
    myDecks = await prisma.deck.findMany({
      where: {
        userId: sessionData.id
      },
      include: {
        _count: {
          select: {
            items: true,
          },
        },
      }
    });
  }

  return (
    <div className='max-width'>
      <h1 className="text-4xl font-extrabold text-slate-700 dark:text-inherit mb-4">My Decks</h1>
      {/* @ts-ignore */}
      <MyDeckList decks={myDecks} ghost={true} onClickGhost={() => { }} />
    </div >
  )
}

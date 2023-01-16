import DeckList from './DeckList';
import prisma from '../../lib/prisma'
import { getSession } from '../../lib/session'

export default async function DeckListPage() {
  // let sessionData = await getSession();

  // let myDecks;
  // if (Object.keys(sessionData).length > 0) {
  //   myDecks = await prisma.deck.findMany({
  //     where: {
  //       userId: sessionData.id
  //     }
  //   });
  // }

  let decksByPopularity = await prisma.deck.findMany({
    where: {
      isPrivate: false
    }
  });
  let decksByDate = await prisma.deck.findMany({
    where: {
      isPrivate: false
    },
    orderBy: [
      {
        dateCreated: 'desc'
      }
    ]
  });

  return (
    <div className='max-width'>
      <h1 className="text-4xl font-extrabold text-slate-700 mb-2">Decks</h1>
      <div className='font-medium text-gray-700 mb-2'>
        Popular Now
      </div>
      {/* @ts-ignore */}
      <DeckList url='/decks/' decks={decksByPopularity} />
      <div className='font-medium text-gray-700 mb-2'>
        Recently Created
      </div>
      {/* @ts-ignore */}
      <DeckList url='/decks/' decks={decksByDate} />
    </div >
  )
}

import DeckList from './DeckList';
import prisma from '../../lib/prisma'

export default async function DeckListPage() {
  let decksByPopularity = await prisma.deck.findMany();
  let decksByDate = await prisma.deck.findMany({
    where: {},
    orderBy: [
      {
        dateCreated: 'desc'
      }
    ]
  });

  return (
    <div>
      {/* @ts-ignore */}
      <div className='font-medium text-gray-700 mb-2'>
        Most Popular
      </div>
      {/* @ts-ignore */}
      <DeckList decks={decksByPopularity} />
      <div className='font-medium text-gray-700 mb-2'>
        Recently Created
      </div>
      {/* @ts-ignore */}
      <DeckList decks={decksByDate} />
    </div >
  )
}

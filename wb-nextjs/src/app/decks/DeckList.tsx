import Deck from './Deck'

export default async function DeckList(props) {
  return (
    <>
      <div className='grid gap-4 mb-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
        {
          props.decks.map((deck) => (
            <Deck key={deck.id} deck={deck} />
          ))
        }
      </div>
    </>
  )
}

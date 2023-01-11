import Deck from './Deck'

export default async function DeckList(props) {
  return (
    <>
      <div className='grid grid-cols-4 gap-4 mb-8'>
        {
          props.decks.map((deck) => (
            <Deck key={deck.id} deck={deck} />
          ))
        }
      </div>
    </>
  )
}

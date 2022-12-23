import Link from 'next/link';
import React from 'react'

type Deck = {
  id : number,
  title : string,
  user_id : number
}

const fetchDecks= async() => {
  const res = await fetch('/api/decks/');
  const decks = await res.json();
}

export default async function DeckList() {
  const decks = await fetchDecks();

  return (
    <>
        {
            decks.map((deck) => (
                <p key={deck.id}>
                    <Link href={`/decks/${deck.id}`}>
                        Deck: {deck.name}, User: {deck.user_id}
                    </Link>
                </p>
            ))
        }
    </>
  )
}

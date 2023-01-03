import React from 'react'
import { notFound } from 'next/navigation'

type DeckPageProps = {
  params: {
    deckId: number
  }
}

const fetchDeck = async (deckId: number) => {
  const res = await fetch('https://my-json-server.typicode.com/typicode/demo/comments');
  const decks = await res.json();
  return [
    { "id": 1, "name": "Math I Kanji Deck", "user_id": 434 },
    { "id": 2, "name": "Math II Kanji Deck", "user_id": 76 },
    { "id": 3, "name": "Book Club: WK 1 Kanji Deck", "user_id": 233 }
  ][deckId - 1];
}

export default async function DeckPage({ params: { deckId } }: DeckPageProps) {
  if (deckId == 2) return notFound();

  const deck = await fetchDeck(deckId);
  return (
    <div>Viewing deck <b>{deck.name}</b></div>
  )
}


//generateStaticParams()
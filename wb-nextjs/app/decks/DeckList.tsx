import React from 'react'

const fetchDecks= async() => {
  const res = await fetch('https://my-json-server.typicode.com/typicode/demo/comments');
  const decks = await res.json();
  return decks;
}

export default async function DeckList() {
  const decks = await fetchDecks();

  console.log(decks)

  return (
    <div>
        DeckList
    </div>
  )
}

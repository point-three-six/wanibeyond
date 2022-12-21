import React from 'react'
import DeckList from './DeckList';

const fetchDecks = async() => {
  const res = await fetch('https://my-json-server.typicode.com/typicode/demo/comments');
  const decks = await JSON.stringify(res.json());
  return decks;
}

export default async function decks() {
  const decks = await fetchDecks();

  return (
    <div>
      {/* @ts-ignore */}
      <DeckList/>
    </div>
  )
}

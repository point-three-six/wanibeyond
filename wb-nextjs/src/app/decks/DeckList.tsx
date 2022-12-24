import React from 'react'
import prisma from '../../lib/prisma'
import Deck from './Deck'

export default async function DeckList() {
  let decks = await prisma.deck.findMany();

  return (
    <>
      <ul>
        {
          decks.map((deck) => (
            <Deck data={deck} />
          ))
        }
      </ul>
    </>
  )
}

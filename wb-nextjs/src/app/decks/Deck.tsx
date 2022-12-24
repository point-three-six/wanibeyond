import Link from 'next/link';
import React from 'react'

export default function Deck(props) {
    return (
        <>
            {
                <div key={props.data.id}>
                    Deck: {props.data.name}<br />
                    Description: {props.data.description}
                </div>
            }
        </>
    )
}

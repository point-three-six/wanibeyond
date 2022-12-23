// Apprentice 1 → 4 hours → Apprentice 2
// Apprentice 2 → 8 hours → Apprentice 3
// Apprentice 3 → 1 day → Apprentice 4
// Apprentice 4 → 2 days → Guru 1
// Guru 1 → 1 week → Guru 2
// Guru 2 → 2 weeks → Master
// Master → 1 month → Enlightened
// Enlightened → 4 months → Burned

//review session data comes in through
//request -> https://www.wanikani.com/lesson/queue

let incomingPayload = {
  // top right screen data
  "count": {
    "rad": 25,
    "kan": 0,
    "voc": 0
  },
  // actual queue data
  // every item that can be learned/review is available.
  "queue": [
    {
      "en": [
        "Ground"
      ],
      "id": 1,
      "rad": "一",
      "mmne": "This radical consists of a single, horizontal stroke. What's the biggest, single, horizontal stroke? That's the <radical>ground</radical>. Look at the ground, look at this radical, now look at the ground again. Kind of the same, right?",
      "type": "Radical",
      "kanji": [
        {
          "en": "One",
          "ja": "いち, いつ",
          "kan": "一",
          "slug": "一",
          "type": "Kanji",
          "characters": "一"
        },
        {
          "en": "Three",
          "ja": "さん",
          "kan": "三",
          "slug": "三",
          "type": "Kanji",
          "characters": "三"
        },
        {
          "en": "Above",
          "ja": "じょう",
          "kan": "上",
          "slug": "上",
          "type": "Kanji",
          "characters": "上"
        }
      ],
      "category": "Radical",
      "characters": "一",
      "auxiliary_meanings": [],
      "character_image_url": null,
      "relationships": {
        "study_material": null
      }
    },
    {
      "en": [
        "Fins"
      ],
      "id": 2,
      "rad": "ハ",
      "mmne": "Picture a fish. Now picture the fish a little worse, like a child's drawing of the fish. Now erase the fish's body and... you're left with two <radical>fins</radical>! Do you see these two fins? Yeah, you see them.",
      "type": "Radical",
      "kanji": [
        {
          "en": "Eight",
          "ja": "はち",
          "kan": "八",
          "slug": "八",
          "type": "Kanji",
          "characters": "八"
        },
        {
          "en": "Six",
          "ja": "ろく",
          "kan": "六",
          "slug": "六",
          "type": "Kanji",
          "characters": "六"
        },
        {
          "en": "Public",
          "ja": "こう",
          "kan": "公",
          "slug": "公",
          "type": "Kanji",
          "characters": "公"
        }
      ],
      "category": "Radical",
      "characters": "ハ",
      "auxiliary_meanings": [],
      "character_image_url": null,
      "relationships": {
        "study_material": null
      }
    },
    {
      "en": [
        "Slide"
      ],
      "id": 5,
      "rad": "丿",
      "mmne": "Close your eyes and imagine you're a kid again. Now open them and... look! It's a <radical>slide</radical>! Imagine little you sliding down this slide over and over, having a great time. Imagination + emotion makes for good memorization!",
      "type": "Radical",
      "kanji": [
        {
          "en": "Genius",
          "ja": "さい",
          "kan": "才",
          "slug": "才",
          "type": "Kanji",
          "characters": "才"
        },
        {
          "en": "Long Time",
          "ja": "きゅう, く",
          "kan": "久",
          "slug": "久",
          "type": "Kanji",
          "characters": "久"
        },
        {
          "en": "Noon",
          "ja": "ご",
          "kan": "午",
          "slug": "午",
          "type": "Kanji",
          "characters": "午"
        }
      ],
      "category": "Radical",
      "characters": "丿",
      "auxiliary_meanings": [],
      "character_image_url": null,
      "relationships": {
        "study_material": null
      }
    }
  ]
}

// ON >COMPLETION< (100% done) with an item
// request WITH ITEM ID is sent to
// https://www.wanikani.com/json/lesson/completed

//e.g.
//keys[]: 6
fetch("https://www.wanikani.com/json/lesson/completed", {
  "headers": {
    //...
  },
  "body": "keys%5B%5D=6",
  "method": "PUT"
});

// server echos back the ID
["1"]
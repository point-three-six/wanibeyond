import prisma from './prisma'

export default async function doStuff() {
    // let user = await prisma.user.findFirst({
    //     where: {
    //         id: 1
    //     }
    // });

    // let deck = await prisma.deck.create({
    //     data: {
    //         name: 'WaniPlus Deck',
    //         description: 'The official WaniPlus deck.',
    //         allowForks: true,
    //         isPrivate: false,
    //         user: {
    //             connect: {
    //                 id: 1
    //             }
    //         }
    //     }
    // })
    // console.log(deck)

    // create items
    let items = [
        {
            "en": [
                "Medical University",
                "Medical School",
                "Med School"
            ],
            "id": 3001,
            "aud": [
                {
                    "url": "https://files.wanikani.com/cftzdda8pwl7d86vwgvoudvp2ov2",
                    "content_type": "audio/ogg",
                    "pronunciation": "いだい",
                    "voice_actor_id": 2
                },
                {
                    "url": "https://files.wanikani.com/ex9wa2f271ia73jbts79owaf1mpj",
                    "content_type": "audio/mpeg",
                    "pronunciation": "いだい",
                    "voice_actor_id": 2
                },
                {
                    "url": "https://files.wanikani.com/m62dk9zg4eo4mu41yxxcii61e8n4",
                    "content_type": "audio/ogg",
                    "pronunciation": "いだい",
                    "voice_actor_id": 1
                },
                {
                    "url": "https://files.wanikani.com/8l2gcmbaajl2k6u2wksvf38gq6b5",
                    "content_type": "audio/mpeg",
                    "pronunciation": "いだい",
                    "voice_actor_id": 1
                }
            ],
            "voc": "医大",
            "kana": [
                "いだい"
            ],
            "mmne": "You've seen <ja>大学</ja> to mean \"college.\" So take the <ja>大</ja> and put it with <kanji>medicine</kanji> to create \"medicine college\", or <vocabulary>medical university</vocabulary>.",
            "rmne": "This is a jukugo word, which usually means on'yomi readings from the kanji. Since <ja>大</ja> has two on'yomi readings, here's a mnemonic to help you remember which one to use:\r\n\r\nYour local <vocabulary>medical university</vocabulary> really prides itself on its <reading>ea</reading>gle <reading>dye</reading> (<ja>いだい</ja>). It's the only dye in the world made straight out of eagles. A bit strange for a medical university, but impressive nonetheless!",
            "type": "Vocabulary",
            "kanji": [
                {
                    "en": "Medicine",
                    "ja": "い",
                    "kan": "医",
                    "slug": "医",
                    "type": "Kanji",
                    "characters": "医"
                },
                {
                    "en": "Big",
                    "ja": "たい, だい",
                    "kan": "大",
                    "slug": "大",
                    "type": "Kanji",
                    "characters": "大"
                }
            ],
            "category": "Vocabulary",
            "sentences": [
                [
                    "わたしは、医大を目ざしてべん強しています。",
                    "I’m studying to get into medical school."
                ],
                [
                    "医者のたまごをかれ氏にするため、医大生のふりをして、医大にせん入してみました。",
                    "I pretended to be a med student and snuck into med school to find a future doctor boyfriend."
                ],
                [
                    "私は、ポケモンコレクションを売って、医大の学費を払った。",
                    "I paid my tuition for med school by selling my Pokémon collection."
                ]
            ],
            "characters": "医大",
            "collocations": [
                {
                    "english": "medical school student",
                    "japanese": "医大の学生",
                    "pattern_of_use": "医大の〜"
                },
                {
                    "english": "private medical school",
                    "japanese": "私立医大",
                    "pattern_of_use": "〜医大"
                },
                {
                    "english": "outpatient of the medical school",
                    "japanese": "医大の外来",
                    "pattern_of_use": "医大の〜"
                },
                {
                    "english": "national medical school",
                    "japanese": "国立医大",
                    "pattern_of_use": "〜医大"
                },
                {
                    "english": "doctor at the medical school",
                    "japanese": "医大の先生",
                    "pattern_of_use": "医大の〜"
                },
                {
                    "english": "women's medical college",
                    "japanese": "女子医大",
                    "pattern_of_use": "〜医大"
                }
            ],
            "parts_of_speech": [
                "Noun"
            ],
            "auxiliary_meanings": [
                {
                    "type": "whitelist",
                    "meaning": "School of Medicine"
                },
                {
                    "type": "whitelist",
                    "meaning": "Medical College"
                }
            ],
            "auxiliary_readings": [],
            "relationships": {
                "study_material": null
            }
        },
        {
            "en": [
                "Sell"
            ],
            "id": 587,
            "on": [
                "ばい"
            ],
            "kan": "売",
            "kun": [
                "う"
            ],
            "emph": "onyomi",
            "mhnt": "Imagine this terrifying samurai. You have legs… okay, that’s normal. But, then you have just a giant forehead on the top of everything else, walking around. It's pretty scary that someone would sell such important parts of their body.",
            "mmne": "There’s a <radical>samurai</radical> with (just) his <radical>forehead</radical> and <radical>legs</radical>. Everything in between is missing. What happened to everything in between? He was low on money, so he had to <kanji>sell</kanji> it all, leaving him with only the top and the bottom.",
            "rhnt": "Imagine saying, \"Bye,\" loudly into the forehead of a samurai trying to sell you the rest of their face. If you say it loud enough it will distract them while you run away.",
            "rmne": "If you see a samurai trying to <kanji>sell</kanji> all their body parts here's what you should say, \"<reading>Bye</reading> (<ja>ばい</ja>)!\" and just get the heck out of there. Actually, if anyone tries to sell you a body part you should probably say bye over and over until you can get away from them.",
            "type": "Kanji",
            "nanori": [],
            "category": "Kanji",
            "radicals": [
                {
                    "en": "Samurai",
                    "rad": "士",
                    "slug": "samurai",
                    "type": "Radical",
                    "characters": "士",
                    "character_image_url": null
                },
                {
                    "en": "Forehead",
                    "rad": "冖",
                    "slug": "forehead",
                    "type": "Radical",
                    "characters": "冖",
                    "character_image_url": null
                },
                {
                    "en": "Legs",
                    "rad": "儿",
                    "slug": "legs",
                    "type": "Radical",
                    "characters": "儿",
                    "character_image_url": null
                }
            ],
            "characters": "売",
            "vocabulary": [
                {
                    "en": "To Sell Something",
                    "ja": "うる",
                    "voc": "売る",
                    "slug": "売る",
                    "type": "Vocabulary",
                    "characters": "売る"
                },
                {
                    "en": "Amount Sold",
                    "ja": "うりあげ",
                    "voc": "売り上げ",
                    "slug": "売り上げ",
                    "type": "Vocabulary",
                    "characters": "売り上げ"
                },
                {
                    "en": "Sold Out",
                    "ja": "うりきれ",
                    "voc": "売り切れ",
                    "slug": "売り切れ",
                    "type": "Vocabulary",
                    "characters": "売り切れ"
                }
            ],
            "auxiliary_meanings": [],
            "auxiliary_readings": [],
            "relationships": {
                "study_material": null
            }
        },
        {
            "en": [
                "Jammed In"
            ],
            "id": 166,
            "rad": "介",
            "mmne": "This radical kind of looks like an arrow, but not an ordinary one. It's curvy and forced, right? Like it's trying to tell you something is being <radical>jammed in</radical> to wherever it's pointing.",
            "type": "Radical",
            "kanji": [
                {
                    "en": "World",
                    "ja": "かい",
                    "kan": "界",
                    "slug": "界",
                    "type": "Kanji",
                    "characters": "界"
                },
                {
                    "en": "Jammed In",
                    "ja": "かい",
                    "kan": "介",
                    "slug": "介",
                    "type": "Kanji",
                    "characters": "介"
                }
            ],
            "category": "Radical",
            "characters": "介",
            "auxiliary_meanings": [
                {
                    "type": "whitelist",
                    "meaning": "Hut"
                }
            ],
            "character_image_url": null,
            "relationships": {
                "study_material": null
            }
        }
    ];

    await prisma.deck.update({
        where: {
            id: 1
        },
        data: {
            items: {
                createMany: {
                    data: [{
                        type: 'vocab',
                        userId: 1,
                        item: items[0],
                        level: 0
                    }, {
                        type: 'kanji',
                        userId: 1,
                        item: items[1],
                        level: 0
                    },
                    {
                        type: 'radical',
                        userId: 1,
                        item: items[2],
                        level: 0
                    }]
                }
            }
        }
    });

    return false;
}
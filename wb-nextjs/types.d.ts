export interface Kanji {
    en: Array,
    id: string,
    type: string,
    level: number,
    characters: string,
    radicals: Array,
    vocabulary: Array,
    meaningHint: string
    mmne: string,
    readingHint: string,
    rmne: string,
    onyomi: Array,
    emph: String,
    kunyomi: Array
    nanori: Array,
    auxiliary_meanings: Array,
    auxiliary_readings: Array
}

export interface Vocab {
    en: Array,
    id: string,
    aud: Array,
    voc: string,
    kana: Array,
    mmne: string,
    rmne: string,
    meaningHint: string,
    readingHint: string,
    type: string,
    kanji: Array,
    category: string,
    sentences: Array,
    characters: string,
    collocations: Array
    parts_of_speech: Array,
    auxiliary_meanings: Array,
    auxiliary_readings: Array
}

export interface Radical {
    en: Array,
    id: string,
    rad: string,
    mmne: string,
    meaningHint: string,
    type: string,
    kanji: Array,
    category: string,
    characters: string,
    auxiliary_meanings: Array,
    character_image_url: string
}
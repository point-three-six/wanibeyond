(() => {
    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getDataForWkof' }, sync);

    async function sync({ decks, lastSync }) {

        // indexedDB.databases() is a nicer solution to check for
        // existence; however, it is not supported by Firefox
        let wkofExists = true;
        const db = await idb.openDB('wkof.file_cache', 1, {
            upgrade() {
                wkofExists = false;
                idb.deleteDB('wkof.file_cache');
            }
        });
        if (!wkofExists) return;

        // build subjects of deck


        return;
        const tx = db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');

        // check for existence of wkof indexeddb
        const dbKeys = await store.getAllKeys();

        if (dbKeys.length > 0) {
            const wpData = await store.get('waniplus');
            const wkofSubjects = await store.get('Apiv2.subjects');
            const dblastSync = wpData.lastSync || 0;

            store.put({ name: 'waniplus', lastSync: new Date().getTime() });
        }
    }

    function generateSubject(item, deckId) {
        let id = Number.MAX_SAFE_INTEGER - item.id;
        let itemType = item.type;
        let dateStr = new Date().toISOString();

        if (itemType == 'kanavocab') itemType = 'radical';
        if (itemType == 'vocab') itemType = 'vocabulary';

        let data = {};
        data.created_at = item.createdAt;
        data.data_updated_at = item.updatedAt;
        data.level = item.level;
        data.slug = item.characters;
        data.hidden_at = null;
        data.document_url = `https://wanikani.com/decks/${deckId}/item/${item.id}`;
        data.characters = item.characters;
        data.meanings = item.en.map((meaning, i) => {
            return {
                meaning: meaning,
                primary: (i == 0) ? true : false,
                accepted_answer: true
            }
        });
        data.auxiliary_meanings = item.data.auxiliary_meanings;

        if (itemType == 'kanji') {
            let kunyomi = item.kun.map((reading, i) => {
                return {
                    type: 'kunyomi',
                    reading: reading,
                    primary: (i == 0 && item.data.emph == 'kunyomi') ? true : false,
                    accepted_answer: (item.data.emph == 'kunyomi') ? true : false
                }
            });
            let onyomi = item.en.map((reading, i) => {
                return {
                    type: 'onyomi',
                    reading: reading,
                    primary: (i == 0 && item.data.emph == 'onyomi') ? true : false,
                    accepted_answer: (item.data.emph == 'onyomi') ? true : false,
                }
            });
            data.readings = kunyomi.concat(onyomi);
        } else if (itemType == 'vocabulary') {
            // - - - VOCABULARY - - -
            data.readings = item.en.map((reading, i) => {
                return {
                    reading: reading,
                    primary: (i == 0) ? true : false,
                    accepted_answer: true
                }
            });
            data.parts_of_speech = item.data.parts_of_speech;
            data.context_sentences = item.data.sentences;
        }

        data.component_subject_ids = []; // todo
        data.meaning_mnemonic = item.data.mmne;

        if (itemType == 'kanji' || itemType == 'vocabulary')
            data.reading_mnemonic = item.data.rmne;

        if (itemType == 'radical' || itemType == 'kanji')
            data.amalgamation_subject_ids = [];

        if (itemType == 'radical')
            data.character_images = [];

        data.pronunciation_audios = [];
        data.lesson_position = 0;
        data.spaced_repetition_system_id = 1;

        return {
            id: id,
            object: itemType,
            url: 'https://api.wanikani.com/v2/subjects/' + id,
            data_updated_at: dateStr,
            data: data,
            assignments: {
                created_at: "2022-11-19T11:24:28.297839Z",
                subject_id: 419,
                subject_type: "radical",
                srs_stage: 6,
                unlocked_at: "2022-11-19T11:24:28.293873Z",
                started_at: "2022-11-26T08:53:25.862657Z",
                passed_at: "2022-11-30T10:23:15.660946Z",
                burned_at: null,
                available_at: "2022-12-22T09:00:00.000000Z",
                resurrected_at: null,
                hidden: false
            },
            review_statistics: {
                "created_at": "2022-11-26T08:53:25.887904Z",
                "subject_id": 419,
                "subject_type": "radical",
                "meaning_correct": 5,
                "meaning_incorrect": 0,
                "meaning_max_streak": 5,
                "meaning_current_streak": 5,
                "reading_correct": 5,
                "reading_incorrect": 0,
                "reading_max_streak": 5,
                "reading_current_streak": 5,
                "percentage_correct": 100,
                "hidden": false
            }
        };
    }

    function generateAssignment() {

    }

    function helperBuildMeanings() {

    }

    window.__wp__.syncWkof = sync;
})();
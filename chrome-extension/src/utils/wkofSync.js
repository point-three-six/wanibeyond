(() => {
    chrome.runtime.sendMessage(window.__wp__.eid, { action: 'getDataForWkof' }, sync);

    async function sync({ decks, syncRequiredAsOf }) {

        // WARNING: indexedDB.databases() does not work on firefox
        let databases = (await indexedDB.databases()).map(db => db.name);
        if (Array.from(databases).indexOf('wkof.file_cache') === -1) return;

        const db = await idb.openDB('wkof.file_cache', 1, {});
        const tx = db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        const wpData = await store.get('waniplus');

        // no need to sync if it's up-to-date
        if (wpData && new Date(wpData.lastWkofSync).getTime() >= syncRequiredAsOf) return;

        console.log('WaniPlus: Syncing with WKOF cache.');

        const wkofSubjects = await store.get('Apiv2.subjects');
        const wkofAssignments = await store.get('Apiv2.assignments');
        const wkofStatistics = await store.get('Apiv2.review_statistics');

        decks.forEach(deck => {
            deck.items.forEach(item => {
                let subject = generateSubject(item, deck.id)
                wkofSubjects.content.data[subject.id] = subject;

                if (item.assignments.length > 0) {
                    let assignment = generateAssignment(item);
                    let statistics = generateReviewStatistic(item);
                    wkofAssignments.content.data[assignment.id] = assignment;
                    wkofStatistics.content.data[statistics.id] = statistics;
                }
            });
        });

        store.put({ name: 'Apiv2.subjects', content: wkofSubjects.content });
        store.put({ name: 'Apiv2.assignments', content: wkofAssignments.content });
        store.put({ name: 'Apiv2.review_statistics', content: wkofStatistics.content });
        store.put({ name: 'waniplus', lastWkofSync: new Date().toISOString() });

        db.close();
    }

    function generateSubject(item, deckId) {
        let id = Number.MAX_SAFE_INTEGER - item.id;
        let itemType = item.data.category.toLowerCase();
        let dateStr = new Date().toISOString();

        let data = {};
        data.__wp__ = true;
        data.created_at = item.createdAt;
        data.data_updated_at = item.updatedAt;
        data.level = item.level;
        data.slug = item.characters;
        data.hidden_at = null;
        data.document_url = `https://wanikani.com/decks/${deckId}/item/${item.id}`;
        data.characters = item.characters;
        data.meanings = item.data.en.map((meaning, i) => {
            return {
                meaning: meaning,
                primary: (i == 0) ? true : false,
                accepted_answer: true
            }
        });
        data.auxiliary_meanings = item.data.auxiliary_meanings;

        if (itemType == 'kanji') {
            let kunyomi = item.data.kun.map((reading, i) => {
                return {
                    type: 'kunyomi',
                    reading: reading,
                    primary: (i == 0 && item.data.emph == 'kunyomi') ? true : false,
                    accepted_answer: (item.data.emph == 'kunyomi') ? true : false
                }
            });
            let onyomi = item.data.en.map((reading, i) => {
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
            data.readings = item.data.en.map((reading, i) => {
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
            data: data
        };
    }

    function generateAssignment(item) {
        let id = Number.MAX_SAFE_INTEGER - item.id;
        let assignments = item.assignments;
        let firstAssignment = assignments[0];
        let lastAssignment = assignments[assignments.length - 1];

        let passedAt = null;
        let burnedAt = null;
        assignments.forEach(assignment => {
            if (passedAt === null && assignment.stage == 5) passedAt = assignment.completedAt;
            if (burnedAt === null && assignment.stage == 9) burnedAt = assignment.completedAt;
        });

        return {
            __wp__: true,
            id: id,
            object: "assignment",
            url: 'https://api.wanikani.com/v2/assignments/wp-' + item.id,
            data_updated_at: lastAssignment.completedAt,
            data: {
                created_at: item.createdAt,
                subject_id: Number.MAX_SAFE_INTEGER - item.id,
                subject_type: item.data.category.toLowerCase(),
                srs_stage: lastAssignment.stage,
                unlocked_at: item.createdAt,
                started_at: firstAssignment.completedAt,
                passed_at: passedAt,
                burned_at: burnedAt,
                available_at: item.availableAt,
                resurrected_at: null,
                hidden: false
            }
        };
    }

    function generateReviewStatistic(item) {
        let id = Number.MAX_SAFE_INTEGER - item.id;
        let assignments = item.assignments;
        let firstAssignment = assignments[0];
        let lastAssignment = assignments[assignments.length - 1];

        // a lot of the statistics data is not tracked
        // in a future version soon this should be added

        return {
            __wp__: true,
            id: id,
            object: "review_statistic",
            url: 'https://api.wanikani.com/v2/review_statistics/wp-' + item.id,
            data_updated_at: lastAssignment.completedAt,
            data: {
                created_at: lastAssignment.completedAt,
                subject_id: Number.MAX_SAFE_INTEGER - item.id,
                subject_type: item.data.category.toLowerCase(),
                meaning_correct: 1,
                meaning_incorrect: 0,
                meaning_max_streak: 1,
                meaning_current_streak: 1,
                reading_correct: 0,
                reading_incorrect: 0,
                reading_max_streak: 0,
                reading_current_streak: 0,
                percentage_correct: 100,
                hidden: false
            }
        };
    }

    window.__wp__.syncWkof = sync;
})();
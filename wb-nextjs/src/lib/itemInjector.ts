import prisma from '../lib/prisma';

function extractIDsByType(ids: Array<number | string>) {
    let wpIds = [];
    let wkIds = [];

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        if (typeof id == 'string') { // wk items will be a string with the format wk-###
            let lasti = id.lastIndexOf('wk');

            if (lasti != -1) {
                let numericalId = parseInt(id.substring(lasti + 3, id.length));
                wkIds.push(numericalId);
            }
        } else {
            wpIds.push(id);
        }
    }

    return {
        'wpIds': wpIds,
        'wkIds': wkIds
    }
}

export default async function injectItemData(itemData) {
    let wkIds = [];
    let wpIds = [];

    // kanji
    // vocabulary
    // radicals
    let fields = ['kanji', 'vocabulary', 'radicals'];

    for (let key in itemData) {
        if (fields.indexOf(key) != -1) {
            let extracted = extractIDsByType(itemData[key]);
            wkIds = wkIds.concat(extracted.wkIds);
            wpIds = wpIds.concat(extracted.wpIds);
        }
    }

    const wkItems = await prisma.wkItem.findMany({
        where: {
            id: { in: wkIds }
        }
    });
    const wpItems = await prisma.item.findMany({
        where: {
            id: { in: wpIds }
        }
    });

    // data has been retrieved, now we need to inject it.
    for (let key in itemData) {
        if (fields.indexOf(key) != -1) {
            let ids = itemData[key];

            // loop through ids and inject
            for (let i = 0; i < ids.length; i++) {
                let id = ids[i];

                if (typeof id == 'string') { // wk items will be a string with the format wk-###
                    // loop through wkItems object and find the relevant item
                    for (let x = 0; x < wkItems.length; x++) {
                        let wkItem = wkItems[x];

                        if ('wk-' + wkItem.id == id) {
                            console.log(wkItem.id)

                            let obj = {
                                'en': '',
                                'ja': '',
                                'slug': '',
                                'type': '',
                                'characters': '',
                                'characters_img_url': ''
                            };

                            obj.en = wkItem.en;
                            obj.ja = wkItem.characters;
                            obj.slug = wkItem.en.toLowerCase();

                            if (wkItem.type == 'radical') {
                                obj.type = 'Radical';
                                obj['rad'] = wkItem.characters;
                            }
                            if (wkItem.type == 'vocab') {
                                obj.type = 'Vocabulary';
                                obj['voc'] = wkItem.characters;
                            }
                            if (wkItem.type == 'kanji') {
                                obj.type = 'Kanji';
                                obj['kan'] = wkItem.characters;
                            }

                            itemData[key][i] = obj;
                            break;
                        }
                    }
                } else {
                    for (let x = 0; x < wpItems.length; x++) {
                        let wpItem = wpItems[x];

                        if (wpItem.id == id) {
                            let obj = {
                                'en': '',
                                'ja': '',
                                'slug': '',
                                'type': '',
                                'characters': '',
                                'characters_img_url': ''
                            };

                            obj.en = wpItem.en;
                            obj.ja = wpItem.characters;
                            obj.slug = wpItem.en.toLowerCase();

                            if (wpItem.type == 'radical') {
                                obj.type = 'Radical';
                                obj['rad'] = wpItem.characters;
                            }
                            if (wpItem.type == 'vocab') {
                                obj.type = 'Vocabulary';
                                obj['voc'] = wpItem.characters;
                            }
                            if (wpItem.type == 'kanji') {
                                obj.type = 'Kanji';
                                obj['kan'] = wpItem.characters;
                            }

                            itemData[key][i] = obj;
                            break;
                        }
                    }
                }
            }
        }
    }

    console.log(itemData)

    return itemData;
}
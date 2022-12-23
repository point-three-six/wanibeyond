XMLHttpRequest.prototype._send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (data) {
    if (this.hasOwnProperty('__hb_xhr')) {
        let req = this.__hb_xhr;
        if (req.url == '/json/lesson/completed') {
            console.log('hijack')
            return;
        }
    }

    this._send.call(this, data);
};

// XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
// XMLHttpRequest.prototype.open = function (m, u) {
//     if (u == '/lesson/queue') {
//         intercept(this);
//     }

//     this._open.apply(this, arguments);
// }

function intercept(xhr) {
    function getter() {
        // delete getter
        delete xhr.responseText;

        // hijack response
        let response = inject(xhr.responseText);

        // restore getter
        hook();

        return response;
    }

    function hook() {
        Object.defineProperty(xhr, 'responseText', {
            get: getter,
            configurable: true
        });
    }

    hook();
}

function inject(response) {
    response = JSON.parse(response);

    response['queue'].unshift({
        "en": [
            "oogabooga"
        ],
        "id": -1,
        "aud": [
            {
                "url": "https://files.wanikani.com/5rrxfz51fxy3hw4bbvhpcnzkvhks",
                "content_type": "audio/ogg",
                "pronunciation": "うま",
                "voice_actor_id": 1
            },
            {
                "url": "https://files.wanikani.com/7aizq5hxfl8jal0qcmzqk7nq0033",
                "content_type": "audio/mpeg",
                "pronunciation": "うま",
                "voice_actor_id": 1
            },
            {
                "url": "https://files.wanikani.com/nh5u41k82bigi2h7to1b5wy4ht24",
                "content_type": "audio/ogg",
                "pronunciation": "うま",
                "voice_actor_id": 2
            },
            {
                "url": "https://files.wanikani.com/khzr10ex5afrrpszhgfb3r9mjo5v",
                "content_type": "audio/mpeg",
                "pronunciation": "うま",
                "voice_actor_id": 2
            }
        ],
        "voc": "馬",
        "kana": [
            "うま"
        ],
        "mmne": "The kanji and the word are exactly the same. That means they share meanings as well.",
        "rmne": "Since this word is made up of a single kanji, it should use the kun'yomi reading. When learning the kanji, you didn't learn that reading, so here's a mnemonic to help you with this word: \r\n\r\nImagine someone riding a horse. Who is that person? It's <reading>Uma</reading> (<ja>うま</ja>) Thurman, the famous actress.",
        "type": "Vocabulary",
        "kanji": [
            {
                "en": "Confused Idiot",
                "ja": "ば, め",
                "kan": "馬",
                "slug": "馬",
                "type": "Kanji",
                "characters": "馬"
            }
        ],
        "category": "Vocabulary",
        "sentences": [
            [
                "あの馬に、ニンジンやリンゴをあげてもいいですか？",
                "WAAAAAAAAA"
            ],
            [
                "わたしの馬は、また一つこんなんをのりこえました。",
                "WAAAAAAAAA"
            ],
            [
                "お年寄りたちが次から次へと馬から落ちたの、めちゃくちゃ面白いと思うんだけど〜！",
                "WAAAAAAAAA"
            ]
        ],
        "characters": "馬(not cool)",
        "collocations": [
            {
                "english": "sussy bfsdfsdfdsfakka",
                "japanese": "馬の耳",
                "pattern_of_use": "馬の〜"
            },
            {
                "english": "sussy bakka",
                "japanese": "馬がいる",
                "pattern_of_use": "馬が〜"
            }
        ],
        "parts_of_speech": [
            "Noun"
        ],
        "auxiliary_meanings": [],
        "auxiliary_readings": [],
        "relationships": {
            "study_material": null
        },
        "wanibeyond": true
    });

    return JSON.stringify(response);
}
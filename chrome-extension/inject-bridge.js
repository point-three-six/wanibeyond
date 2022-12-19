let url = 'https://www.wanikani.com/lesson/queue';
let xhr;

let old_open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(m,u){
    if(u == '/lesson/queue'){
        intercept(this);
    }

    old_open.apply(this, arguments);
}

function intercept(xhr) {
    function getter(){
        // delete getter
        delete xhr.responseText;

        // hijack response
        let response = inject(xhr.responseText);

        // restore getter
        hook();

        return response;
    }

    function hook(){
        Object.defineProperty(xhr, 'responseText', {
            get: getter,
            configurable: true
        });
    }

    hook();
}

function inject(response){
    response = JSON.parse(response);

    response['queue'][0]['en'][0] = 'We got em';

    return JSON.stringify(response);
}
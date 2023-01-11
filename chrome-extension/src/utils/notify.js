let msgCount = 0;

window.__wp__.notify = (msg) => {
    var msgId = ++msgCount;
    var style = 'display:flex;justify-content:space-between;z-index:999;padding:12px;position:absolute;bottom:0;right:0;background-color:slategrey;color:#eee;margin:15px;max-width:250px;'
    var html = `
    <div id="wp-msg-${msgId}" style='${style}'>
        <div style='flex:grow;margin-left:3px;'>
            ${msg} 
        </div>
        <div style='flex:initial;text-align:right;align-self:center;'>
            <a id="wp-close-${msgId}" href='#' style='font-size:1.2em;font-weight:bold;color:white;'>&times;</a>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById(`wp-close-${msgId}`).addEventListener('click', function () {
        document.getElementById(`wp-msg-${msgId}`).remove();
    });
}
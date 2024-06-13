console.log('loaded redmine helper');

const addAttachmentImages = () => {
    const attachmentLinks = document.querySelectorAll('a.icon-attachment');
    attachmentLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        const img = document.createElement('img');
        img.setAttribute('src', href);
        link.parentNode.insertBefore(img, link.nextSibling);
        link.parentNode.insertBefore(document.createElement('br'), link.nextSibling);
    });
}

const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                const editor = event.target;
                const doc = editor.ownerDocument.defaultView;
                const sel = doc.getSelection();
                if (sel.rangeCount) {
                    const range = sel.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(img);
                }
            };
            reader.readAsDataURL(blob);
        }
    }
}

setTimeout(()=>{
    addAttachmentImages();

    const notesEditor = document.querySelector('.cke_wysiwyg_frame');
    if (notesEditor) {
        console.log('pasteImagHandlerActive');
        notesEditor.contentDocument.addEventListener('paste', handlePaste);
    }else console.log('could not find ck editor');
}, 1500);



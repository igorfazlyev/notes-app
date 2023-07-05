const noteID = location.hash.substring(1);
const notes = getSavedNotes();
const note = notes.find((note)=>{
    return note.id === noteID;
})
//alert(note);
if (note === undefined) {
    location.assign("/index.html");
}else{
    const titleElement = document.querySelector('#note-title');
    const bodyElement = document.querySelector('#note-body');
    const removeButton = document.querySelector('#remove-note');

    titleElement.value = note.title;
    bodyElement.value = note.body;

    titleElement.addEventListener('input',(e)=>{
        note.title = e.target.value;
        saveNotes(notes);
    });

    bodyElement.addEventListener('input',(e)=>{
        note.body = e.target.value;
        saveNotes(notes);
    });

    removeButton.addEventListener('click', (e)=>{
        removeNote(noteID);
        saveNotes(notes);
        location.assign('/index.html');
    })
}


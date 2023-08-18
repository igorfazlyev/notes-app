'use strict'
const noteID = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note)=>{
    return note.id === noteID;
})
//alert(note);
if (!note) {
    location.assign("/index.html");
}else{
    const titleElement = document.querySelector('#note-title');
    const lastUpdatedElement = document.querySelector('#last-updated');
    const bodyElement = document.querySelector('#note-body');
    const removeButton = document.querySelector('#remove-note');

    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastUpdatedElement.textContent = lastUpdated(note);

    titleElement.addEventListener('input',(e)=>{
        note.title = e.target.value;
        note.updatedAt = moment().valueOf();
        lastUpdatedElement.textContent = lastUpdated(note);
        saveNotes(notes);
        
    });

    bodyElement.addEventListener('input',(e)=>{
        note.body = e.target.value;
        note.updatedAt = moment().valueOf();
        lastUpdatedElement.textContent = lastUpdated(note);
        saveNotes(notes);
    });

    removeButton.addEventListener('click', (e)=>{
        removeNote(noteID);
        saveNotes(notes);
        location.assign('/index.html');
    })

    window.addEventListener('storage', (e)=>{
        if (e.key === 'notes'){
            //console.log("we are here");
            notes = JSON.parse(e.newValue);
            note = notes.find((note)=>{
                return note.id === noteID;
            });
            if (note){
                titleElement.value = note.title;
                bodyElement.value = note.body;
                lastUpdatedElement.textContent = lastUpdated(note);
            }else{
                location.assign('/index.html')
            }
            
        }
    })

}



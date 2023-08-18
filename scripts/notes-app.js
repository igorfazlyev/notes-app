'use strict'
let  notes = getSavedNotes();

const filters = {
    searchText:'',
    sortBy: 'updatedAt'
};


renderNotes(notes, filters);

document.querySelector('#search-box').addEventListener('input', (e)=>{
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector('#add-note').addEventListener('submit', (e)=>{
    e.preventDefault();
    const noteID = crypto.randomUUID();
    const timestamp = moment().valueOf();

    notes.push(
        {
            id: noteID,
            title:'',
            body:'',
            createdAt: timestamp,
            updatedAt: timestamp
        }
    );
    //renderNotes(notes, filters);
    //e.target.elements.newNote.value = '';
    //localStorage.removeItem('notes'); there is no need for this line
    saveNotes(notes);
    //location.hash = noteID;
    location.assign(`./note.html#${noteID}`);
})

document.querySelector('#sort-by').addEventListener('change',(e)=>{
    //console.log(e.target.value);
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
})

window.addEventListener('storage', (e)=>{
    if (e.key === 'notes'){
        //console.log("we are here");
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
})
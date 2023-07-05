let  notes = getSavedNotes();

const filters = {
    searchText:''
};


renderNotes(notes, filters);

document.querySelector('#search-box').addEventListener('input', (e)=>{
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector('#add-note').addEventListener('submit', (e)=>{
    e.preventDefault();
    const contents = e.target.elements.newNote.value.split(":");
    if (contents.length < 2) {
        contents.push('');
    }
    const noteID = crypto.randomUUID();
    notes.push(
        {
            id: noteID,
            title:contents[0],
            body:contents[1]
        }
    );
    //renderNotes(notes, filters);
    e.target.elements.newNote.value = '';
    //localStorage.removeItem('notes'); there is no need for this line
    saveNotes(notes);
    //location.hash = noteID;
    location.assign(`./note.html#${noteID}`);
})

document.querySelector('#sort-by').addEventListener('change',(e)=>{
    console.log(e.target.value);
})
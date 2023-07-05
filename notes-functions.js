// read existing notes from local storage
const getSavedNotes = function(){
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes !== null){
        return JSON.parse(storedNotes)
    }else{
        return [];
    }
}
// save notes
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes));
}
//
const removeNote = function(noteId){
    const indexToRemove = notes.findIndex((elem)=>elem.id===noteId);
    if (indexToRemove > -1) {
        notes.splice(indexToRemove,1);
    }
}
// generate note dom
const generateNoteDom = function(noteData){
    const noteElement = document.createElement('div');
    noteElement.style.marginTop='1%';
    noteElement.style.marginBottom ='1%';
    const noteTitle = document.createElement('span');
    //
    const noteEditLink = document.createElement('a');

    noteEditLink.setAttribute("href", `./note.html#${noteData.id}`);
    //
    const noteBody = document.createElement('span');
    
    
    const deleteButton = document.createElement('button');
    deleteButton.style.marginRight = '2%';
    deleteButton.textContent = "x";
    deleteButton.addEventListener('click', ()=>{
        //console.log(notes);
        removeNote(noteData.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    
    })

    noteTitle.style.fontWeight = "bold";
    noteEditLink.textContent = noteData.title + ": ";
    noteTitle.appendChild(noteEditLink);

    noteBody.textContent = noteData.body;
   

    noteElement.appendChild(deleteButton);
    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteBody);
    

    return noteElement;
}
// render notes
const renderNotes = function(notes, filters) {
    const filteredNotes = notes.filter((note)=>{
        const foundInTitle = note.title.toLowerCase().includes(filters.searchText.toLowerCase());
        const foundInBody = note.body.toLowerCase().includes(filters.searchText.toLowerCase());
        return foundInTitle || foundInBody;
    });

    document.querySelector('#notes').innerHTML ='';

    filteredNotes.forEach((note)=>{
    
        const noteElement = generateNoteDom(note);
        document.querySelector('#notes').appendChild(noteElement);
       
    });
    
}
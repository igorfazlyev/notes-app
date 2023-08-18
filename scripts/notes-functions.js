'use strict'
// read existing notes from local storage
const getSavedNotes = ()=>{
    const storedNotes = localStorage.getItem('notes');
    try {
        return storedNotes ? JSON.parse(storedNotes) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
}
//
const lastUpdated = (note)=>{
    return `Last edited ${moment(note.updatedAt).fromNow()}`;
}
// save notes
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes));
}
//
const removeNote = (noteId)=>{
    const indexToRemove = notes.findIndex((elem)=>elem.id===noteId);

    if (indexToRemove > -1) {
        notes.splice(indexToRemove,1);
    }
}
// generate note dom
const generateNoteDom = (noteData)=>{
    const noteElement = document.createElement('a');
    noteElement.setAttribute("href", `./note.html#${noteData.id}`);
    noteElement.classList.add('list-item');
    //noteElement.style.marginTop='1%';
    //noteElement.style.marginBottom ='1%';
    const noteTitle = document.createElement('h4');
    noteTitle.classList.add('list-item__title')
    noteTitle.textContent = noteData.title;
    //Body
    const noteBody = document.createElement('div');
    noteBody.style.marginTop = '0.5%';
    noteBody.style.marginBottom = '2%';
    noteBody.textContent = noteData.body;
   //Status
   const noteStatus = document.createElement('div');
   noteStatus.classList.add('list-item__subtitle');
   noteStatus.textContent = lastUpdated(noteData);;
    //noteElement.appendChild(deleteButton);
    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteBody);
    noteElement.appendChild(noteStatus);
    

    return noteElement;
}
//sort notes
const sortNotes = (notes, sortBy)=>{
    //console.log(sortBy);
    const sortedNotes = notes.sort((note1, note2)=>{
        
        if (note1[sortBy] > note2[sortBy]) {
            return -1;
        }else if (note1[sortBy] < note2[sortBy]) {
          
            return 1;
        }else{
            return 0
        }
    });
    if (sortBy === "title") {
        return sortedNotes.sort((note1, note2)=>{
            if (note1.title.toLowerCase() < note2.title.toLowerCase()) {
                return -1;
            }else if (note1.title.toLowerCase()>note2.title.toLowerCase()){
                return 1;
            }else{
                return 0;
            }
        })
    }else{
        return sortedNotes
    }
}
// render notes
const renderNotes = (notes, filters)=> {
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note)=>{
        const foundInTitle = note.title.toLowerCase().includes(filters.searchText.toLowerCase());
        const foundInBody = note.body.toLowerCase().includes(filters.searchText.toLowerCase());
        return foundInTitle || foundInBody;
    });
    const notesElement = document.querySelector('#notes');
    notesElement.innerHTML ='';
    if (filteredNotes.length === 0) {
        const noNotesMessage = document.createElement('p');
        noNotesMessage.textContent = 'No notes to show';
        noNotesMessage.classList.add('empty-message');
        notesElement.appendChild(noNotesMessage);
    }else{
        

        filteredNotes.forEach((note)=>{
        
            const noteElement = generateNoteDom(note);
            //noteElement.classList.add('list-item');
            notesElement.appendChild(noteElement);
           
        });
    }
    
   
    
}
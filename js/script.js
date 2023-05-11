const noteForm = document.querySelector(".form");
const noteInput = document.querySelector(".input");
const notesCards = document.querySelector(".notes");
const hexColors = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
];
let notes = []
if(localStorage.getItem("notes")){
    notes = JSON.parse(localStorage.getItem("notes"));
}
notes.forEach(function(note){
    let cardNote = document.createElement("div");
    cardNote.id = note.noteId;
    cardNote.className = "note";
    cardNote.innerHTML = `<p>${note.noteText}</p>`
    const btnDelete = `<button data-btn="delete" class="btn_delete">X</button>`;
    cardNote.insertAdjacentHTML("beforeend",btnDelete)
    cardNote.style.backgroundColor = note.noteColor
    notesCards.append(cardNote);
})

noteForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(noteInput.value === ""){
        noteInput.style.borderColor = "#ff0000";
    }else{
        noteInput.style.borderColor = "#ffff00";
         addNote();
    }
});
notesCards.addEventListener("click", deleteNote);


// * Функции

function addNote(){
    const newNote = {
        noteId: Date.now(),
        noteText: noteInput.value,
    };
    let note = document.createElement("div");
    note.id = newNote.noteId;
    note.className = "note";
    note.innerHTML = `<p>${newNote.noteText}</p>`
    const btnDelete = `<button data-btn="delete" class="btn_delete">X</button>`;
    note.insertAdjacentHTML("beforeend",btnDelete)
    notesCards.append(note);
    colorGenerator(note,newNote)
    notes.push(newNote);
    seveInLocalStorage();
    noteInput.value = "";
    return note;
};

function deleteNote(e){
    if(e.target.dataset.btn === "delete"){
        const cardNote = e.target.closest(".note");
        const noteId = Number(cardNote.id);
        notes = notes.filter(function(note){
            return  note.noteId !== noteId 
        })
        seveInLocalStorage();
        cardNote.remove();
    };
};

function seveInLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes))
};

function getRandomNambers(){
    return Math.floor(Math.random() * hexColors.length);
};

function colorGenerator(note,newNote){
    let colorHex = "#";
    for(let i = 0; i < 6; i++){
        colorHex += hexColors[getRandomNambers()]
    };
    note.style. backgroundColor = colorHex;
    newNote.noteColor = colorHex;
};
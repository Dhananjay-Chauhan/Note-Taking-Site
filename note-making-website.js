console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
      notesObj = [];
      titleObj = [];
} else {
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
  }
  notesObj.push(addTxt.value);
  titleObj.push(addTitle.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
      notesObj = JSON.parse(notes);
      titleObj = JSON.parse(title);
    }
  let html = "";
  var i=0;
  notesObj.forEach(function(element, index, i) {
    var i=index+1;
    
    
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titleObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${i}"onclick="editNote('${element}',${i})" class="btn btn-primary">Edit Note</button>
                    </div>
                </div>`;
    
    
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
      notesObj = JSON.parse(notes);
      titleObj = JSON.parse(title);
    }
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("title", JSON.stringify(titleObj));
    showNotes();
}

//  Edit notes Feature
function editNote(element,i){
    console.log('edit is working');
    console.log(element);
    // console.log(i);
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
      notesObj = JSON.parse(notes);
      titleObj = JSON.parse(title);
    }
    let edthtml=" ";
    let edt = document.getElementById('edit');

        edthtml +=`  
                    <div class="card">
                    <div class="card-body">
                        <h1>Edit Here 😎</h1>
                        <textarea id="edtTitle" class="form-control my-3">${titleObj[i-1]}</textarea>
                        <textarea class="form-control" id="edtTxt" rows="3">${element}</textarea>
                        <button class="btn btn-primary" id="saveit" onclick="saveNote('${element}',${i})">Save</button>
                    </div>
                    </div>`;
    
    if(notesObj.length !=0){
        edt.innerHTML = edthtml;
    }
    else{
        edt.innerHTML = 'Nothing to edit' ;
    }
    // let edtTxt = document.getElementById("addTxt");
    // let txtval = notesObj[i];
    // edtTxt.value = txtval;

    // localStorage.set

    showNotes();
}
function saveNote(element,i){
  console.log('helo',i);
  let edtTxt = document.getElementById("edtTxt");
  let edtTitle = document.getElementById("edtTitle");
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
      notesObj = [];
      titleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
  }
  // notesObj[i-1].replace(notesObj[i-1],edtTxt.value);    useless
  notesObj.splice(i-1,1,edtTxt.value);
  titleObj.splice(i-1,1,edtTitle.value);
  // notesObj.push(edtTxt.value); useless
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  showNotes();
  let edt = document.getElementById('edit');
  edt.style.display = "none";
 
  // console.log(addTxt.value);        useless

// useless
  // let edttxt=element;
  // element=element+addTxt;
  // element=element.slice(edttxt.length);
  // console.log(element);
  // notesObj.splice(i-1,1);
  // notesObj.push(element);
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
});

// Adding title 


/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 

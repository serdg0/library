let myLibrary = [];
var INDEX = 0;

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype.read = false;
Book.prototype.id = null;

function buildNav(){
    let navBar = document.getElementById("nav");
    let addBookButton = document.createElement("button");
    let populateLibraryButton = document.createElement("button");
    addBookButton.setAttribute("class", "btn btn-info");
    populateLibraryButton.setAttribute("class", "btn btn-info");
    let addTxt = document.createTextNode("Add a book");
    let populateTxt = document.createTextNode("Watch some examples");
    addBookButton.appendChild(addTxt);
    populateLibraryButton.appendChild(populateTxt);
    addBookButton.onclick = () => addForm();
    populateLibraryButton.onclick = () => populateLibrary();
    navBar.appendChild(addBookButton);
    navBar.appendChild(populateLibraryButton);
}

function addForm(){
    let parentForm = document.getElementById("myForm");
    let form = document.createElement("form");
    parentForm.appendChild(form);
    let inputTitle = document.createElement("input");
    let readInput = document.createElement("input");
    readInput.setAttribute("type", "checkbox");
    readInput.setAttribute("id", "read");
    inputTitle.setAttribute("placeholder", "The Hobbit");
    inputTitle.setAttribute("id", "new-title");
    inputTitle.setAttribute("class", "form-control");
    let inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("placeholder", "J.R Tolkien");
    inputAuthor.setAttribute("id", "new-author");
    inputAuthor.setAttribute("class", "form-control");
    let inputPages = document.createElement("input");
    inputPages.setAttribute("placeholder", "420");
    inputPages.setAttribute("id", "new-pages");
    inputPages.setAttribute("type", "number");
    inputPages.setAttribute("class", "form-control");
    let submitButton = document.createElement("button");
    let submitTxt = document.createTextNode("Add it");
    submitButton.appendChild(submitTxt);
    submitButton.setAttribute("onclick", "addBookDOM()");
    form.appendChild(inputTitle);
    form.appendChild(inputAuthor);
    form.appendChild(inputPages);
    form.appendChild(readInput);
    parentForm.appendChild(submitButton);

}

function addBookDOM(){
    let title = document.getElementById("new-title").value;
    let author = document.getElementById("new-author").value;
    let pages = document.getElementById("new-pages").value;
    let read = document.getElementById("read").checked;
    addBook(title, author, pages, read);
    document.getElementById("myForm").innerHTML = "";
}

function addBook(title, author, pages, read=false) {
    let newBook = new Book(title, author, pages);
    INDEX++;
    newBook.id = INDEX;
    newBook.read = read;
    myLibrary.unshift(newBook);
    renderLibrary();
}

function availableIds() {
    return myLibrary.map(book => {
        return book.id;
    });
}

function defineReadButton(button, book) {
    if (book.read == true) {
        button.setAttribute("class", "btn btn-dark btn-sm card-link");
    } else {
        button.setAttribute("class", "btn btn-light btn-sm card-link");
    }
}

function renderLibrary(){
    document.getElementById("Library").innerHTML = "";
    myLibrary.forEach(book => {
        let div = document.getElementById("Library");
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        card.setAttribute("class", "card shadow-lg mb-2");
        cardBody.setAttribute("class", "card-body");
        card.appendChild(cardBody);
        div.appendChild(card);
        let head = document.createElement("h2");
        let pAuthor = document.createElement("p");
        let pPages = document.createElement("p");
        pAuthor.setAttribute("class", "card-subtitle");
        pPages.setAttribute("class", "card-subtitle text-muted");
        head.setAttribute("class", "card-header card-title text-center mb-2");
        let removeB = document.createElement("button");
        let readOrNot = document.createElement("button");
        removeB.setAttribute("class", "btn btn-danger btn-sm card-link");
        defineReadButton(readOrNot, book);
        cardBody.appendChild(head);
        cardBody.appendChild(pAuthor);
        cardBody.appendChild(pPages);
        cardBody.appendChild(removeB);
        cardBody.appendChild(readOrNot);
        let tName = document.createTextNode("Author: " + book.author);
        let tTitle = document.createTextNode(book.title);
        let tPages = document.createTextNode(book.pages+ " pages");
        let addButton = document.createTextNode("Burn");
        let readBtxt = document.createTextNode("Read");
        readOrNot.appendChild(readBtxt);
        removeB.appendChild(addButton);
        head.appendChild(tTitle);
        pAuthor.appendChild(tName);
        pPages.appendChild(tPages);
        removeB.onclick = () => {
            let index = myLibrary.findIndex(b => b.id == book.id);
            myLibrary.splice(index, 1);
            renderLibrary();
        };
        readOrNot.onclick = () => {
            book.read = !book.read;
            defineReadButton(readOrNot, book);
        }
    });
}




function populateLibrary() {
    document.getElementById("Library").innerHTML = "";
    addBook("Lord of the Rings", "J.R Tolkien", 399, true);
    addBook("Money", "Floyd Mayweather", 50);
    addBook("The Bible", "Various", 878);
    addBook("Harry Potter and the Philosopher's kush", "Bob Marley", 420);
    addBook("Mas alla del bien y el mal", "Friedrich Nietzche", 50, true);
    addBook("Metal Drum", "Gunter Grass", 800, true);
}

buildNav();

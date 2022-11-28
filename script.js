let myLibrary = [];


// Object constructor for new book
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  // this.info = function() {
  //   return (`${title} by ${author}, ${pages} pages, ${read}`)
  // }
}


// Accept HTML form, create new book object and append to array
function addBookToLibrary() {
  let bookTitle = document.querySelector('#book-title').value;
  let bookAuthor = document.querySelector('#book-author').value;
  let bookPages = document.querySelector('#book-pages').value;
  let bookDone = '';

  let readStatus = document.querySelector('#readStatus').checked;
  if (readStatus == true) {
    bookDone = '✔';
  } else {
    bookDone = '✖';
  }

  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookDone);
  myLibrary.push(newBook);

  displayBook();
  // Include clear form input code here
  closeForm();
}
// const btnSubmitForm = document.querySelector('form > button');
const btnSubmitForm = document.querySelector('form');
btnSubmitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // event.stopPropagation();
  addBookToLibrary();
})


// Event listener when "+ ADD BOOK" clicked
function openForm() {
  let form = document.querySelector('form');
  form.style.display = 'flex';
  
  let blurHeader = document.querySelector('#header');
  blurHeader.classList.add('blur');

  let blurContent = document.querySelector('#content');
  blurContent.classList.add('blur');

  let blurFooter = document.querySelector('#footer');
  blurFooter.classList.add('blur');
}
const btnAddBook = document.querySelector('#title > button');
btnAddBook.addEventListener('click', () => {
  openForm();
})


// Event listener to close form
function closeForm() {
  let form = document.querySelector('form');
  form.style.display = 'none';
  
  let blurHeader = document.querySelector('#header');
  blurHeader.classList.remove('blur');

  let blurContent = document.querySelector('#content');
  blurContent.classList.remove('blur');

  let blurFooter = document.querySelector('#footer');
  blurFooter.classList.remove('blur');
}
const btnCloseForm = document.querySelector('#close-form');
btnCloseForm.addEventListener('click', (event) => {
  // console.log(event);
  event.preventDefault();
  closeForm();
  // if (e.target[])
  // event.stopPropagation();
  // try above method; condition to stop propagation on submit
})


// Update booklist display on webpage
let bookList = document.querySelector('tbody');
function displayBook() {

  while (bookList.lastChild) {
    bookList.removeChild(bookList.lastChild);
  }

  let bookIndex = 1;
  for (let i = 0; i < myLibrary.length; i++) {

    let newBook = document.createElement('tr');
    newBook.classList.add(`book${bookIndex}`);
    bookList.appendChild(newBook);
    bookIndex += 1

    let newBookTitle = document.createElement('td');
    newBookTitle.textContent = `${myLibrary[i].title}`;
    newBook.appendChild(newBookTitle);

    let newBookAuthor = document.createElement('td');
    newBookAuthor.textContent = `${myLibrary[i].author}`;
    newBook.appendChild(newBookAuthor);
    
    let newBookPages = document.createElement('td');
    newBookPages.textContent = `${myLibrary[i].pages}`;
    newBook.appendChild(newBookPages);

    let newBookRS = document.createElement('td');
    let readBtn = document.createElement('button');
    readBtn.textContent = `${myLibrary[i].readStatus}`;
    readBtn.classList.add(`readBtn`);
    newBookRS.appendChild(readBtn);
    newBook.appendChild(newBookRS);

    let newBookDelete = document.createElement('td');
    let removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.classList.add(`removeBtn`);
    newBookDelete.appendChild(removeBtn);
    newBook.appendChild(newBookDelete);
  }

  let readBtn = document.querySelectorAll('.readBtn');
  readBtn.forEach(book => {
    book.addEventListener('click', event => {
      // console.log(event);
      
      let bookStatusToUpdate = event.path[2].childNodes[0].innerText;
      console.log(bookStatusToUpdate);
      let bookStatusIndex = myLibrary.findIndex(object => {
        return object.title === `${bookStatusToUpdate}`;
      })
      console.log(bookStatusIndex);
      
      let readBtn = event.target;
      if (readBtn.innerText === '✔') {
        readBtn.innerText = `✖`;
        myLibrary[bookStatusIndex].readStatus = `✖`;
      } else {
        readBtn.innerText = '✔';
        myLibrary[bookStatusIndex].readStatus = `✔`;
      }
    })
  })

  let removeBtn = document.querySelectorAll('.removeBtn');
  removeBtn.forEach(book => {
    book.addEventListener('click', event => {
      // console.log(event);
      let bookNumber = event.path[2];
      let bookParent = event.path[3];
      bookParent.removeChild(bookNumber);
      
      // let bookIndex = myLibrary.indexOf(bookNumber.childNodes[0].innerText);
      let bookToDel = bookNumber.childNodes[0].innerText;
      // console.log(bookToDel);
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === bookToDel) {
          // let bookNum = myLibrary.indexOf(bookToDel);
          // console.log(bookNum);
          myLibrary.splice(i, 1);
        }
      }  
    })
  })
}


// TO DO LIST:
// Prototype Book
// Styling of booklist

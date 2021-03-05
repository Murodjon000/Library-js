const titleInput = document.querySelector('.titleInput');
const bookButton = document.querySelector('.book-button');
const bookList = document.querySelector('.book-list');

const authorInput = document.getElementById('authorInput');
const pageInput = document.getElementById('pageInput');
const readCheckbox = document.getElementById('readCheckbox');
const form = document.getElementById('form');

const myLibrary = [];

function Book(title = '', author = '', pages = '', read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookCard(book, index) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  // To do list
  const newBook = document.createElement('li');
  newBook.textContent = `Book Name: ${book.title} `;
  newBook.classList.add('book-item');

  bookDiv.appendChild(newBook);

  const author = document.createElement('li');
  author.textContent = `Author : ${book.author} `;
  author.classList.add('book-item');

  bookDiv.appendChild(author);


  const page = document.createElement('li');
  page.textContent = `Pages: ${book.pages} `;
  page.classList.add('book-item');

  bookDiv.appendChild(page);

  // Check mark Button
  const completeButton = document.createElement('button');
  completeButton.setAttribute('data-index', index);
  completeButton.innerText = book.read ? 'UnRead' : 'Read';
  completeButton.classList.add('complete-btn');
  bookDiv.appendChild(completeButton);

  // Trash button
  const trashButton = document.createElement('button');
  trashButton.setAttribute('data-index', index);
  trashButton.innerHTML = '<i class = "fa fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  bookDiv.appendChild(trashButton);
  // Append to list
  bookList.appendChild(bookDiv);

  /* eslint-disable no-use-before-define */
  completeButton.addEventListener('click', checkBox);
  trashButton.addEventListener('click', deleteBook);
  /* eslint-enable no-use-before-define */
}

function updateBooks() {
  bookList.innerHTML = '';
  myLibrary.forEach((book, index) => createBookCard(book, index));
}

function addBook(e) {
  e.preventDefault();
  // To do DIV
  if (myLibrary.some((book) => book.title === titleInput.value)) {
    return;
  }

  const book = new Book(
    titleInput.value,
    authorInput.value,
    pageInput.value,
    readCheckbox.checked,
  );

  myLibrary.push(book);
  updateBooks();
  form.reset();
}

bookButton.addEventListener('click', addBook);

function deleteBook(e) {
  const item = e.target;
  const index = item.getAttribute('data-index');
  myLibrary.splice(index, 1);
  updateBooks();
}

function checkBox(e) {
  const item = e.target;
  const index = item.getAttribute('data-index');
  const book = myLibrary[index];
  book.read = !book.read;
  updateBooks();
}

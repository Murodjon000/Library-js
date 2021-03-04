const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

const authorInput = document.getElementById('authorInput')
const pageInput = document.getElementById('pageInput')
const readCheckbox = document.getElementById('readCheckbox')
const form = document.getElementById('form')

let myLibrary = []

function Book(title = '', author = '', pages = '', read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


todoButton.addEventListener('click', addTodo)

function createBookCard(book, index) {
    const bookDiv = document.createElement('div')
    bookDiv.classList.add('todo')
    // To do list
    const newBook = document.createElement('li')
    newBook.textContent = `Book Name: ${book.title} `
    newBook.classList.add('todo-item')

    bookDiv.appendChild(newBook)

    const author = document.createElement('li')
    author.textContent = `Author : ${book.author} `
    author.classList.add('todo-item')

    bookDiv.appendChild(author)


    const page = document.createElement('li')
    page.textContent = `Pages: ${book.pages} `
    page.classList.add('todo-item')

    bookDiv.appendChild(page)

    //Check mark Button
    const completeButton = document.createElement('button')
    completeButton.setAttribute('data-index', index);
    completeButton.innerText = book.read ? 'UnRead' : 'Read'
    completeButton.classList.add('complete-btn')
    bookDiv.appendChild(completeButton)

    // Trash button
    const trashButton = document.createElement('button')
    trashButton.setAttribute('data-index', index);
    trashButton.innerHTML = '<i class = "fa fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    bookDiv.appendChild(trashButton)
    // Append to list
    todoList.appendChild(bookDiv)

    completeButton.addEventListener('click', checkBox)
    trashButton.addEventListener('click', deleteBook)
}

function updateBooks() {
    todoList.innerHTML = ''
    myLibrary.forEach((book, index) => createBookCard(book, index))
}

function addTodo(e) {
    e.preventDefault()
    // To do DIV
    if (myLibrary.some(({ book }) => book.title === todoInput.value)) {
        return
    }

    const book = new Book(
        todoInput.value,
        authorInput.value,
        pageInput.value,
        readCheckbox.value
    )

    myLibrary.push(({ book }))
    updateBooks()
    form.reset()

}

function deleteBook(e) {
    const item = e.target

    let index = item.getAttribute('data-index');

    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement
        todo.classList.add('fall')

        todo.addEventListener('transitionend', function () {
            console.log(myLibrary)
            myLibrary = myLibrary.filter(function(value, i) {
                return i != index
            })
            todo.remove()
        })
    }

}

function checkBox(e) {
    let index = e.target.getAttribute('data-index');
    book = myLibrary[index];
    book.read = !book.read
    updateBooks()
}

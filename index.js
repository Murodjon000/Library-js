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

function createBookCard(book) {
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
    completeButton.innerText = book.read ? 'UnRead' : 'Read'
    completeButton.classList.add('complete-btn')
    bookDiv.appendChild(completeButton)

    // Trash button
    const trashButton = document.createElement('button')
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
    myLibrary.forEach(({ book }) => createBookCard(book))
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

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        todo.classList.add('fall')

        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }

}

function checkBox(e) {
    const { title } = e.target.parentElement
    const bookInd = myLibrary.findIndex(({ book }) => book.title === title)
    myLibrary[bookInd].book.read = !myLibrary[bookInd].book.read
    updateBooks()
}
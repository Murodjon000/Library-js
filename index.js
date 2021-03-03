let formToggler = document.getElementById('formToggler')
let form = document.getElementById('form')
let titleInput = document.getElementById('titleInput')
let authorInput = document.getElementById('authorInput')
let pageInput = document.getElementById('pageInput')
let readCheckbox = document.getElementById('readCheckbox')
let bookList = document.getElementById('bookList')

let myLibrary = []

function Book(title = '', author = '', pages = '', read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    // do stuff here
}
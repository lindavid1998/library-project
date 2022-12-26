class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

let myBooks = [];

const bookList = document.querySelector('.book-list')

function displayBooks() {
    for (let i = 0; i < myBooks.length; i++) {
        bookList.appendChild(createBookCard(myBooks[i]));
    }
}

function addBook(book) {
    myBooks.push(book)
    bookList.appendChild(createBookCard(book))
}

function createDiv(className, textContent = '') {
    let div = document.createElement('div')
    div.classList.add(className)
    div.textContent = textContent

    return div
}

function createBookCard(book) {
    title = createDiv('title', book.title);
    author = createDiv('author', book.author);
    pages = createDiv('pages', book.pages);

    del = document.createElement('span');
    del.classList.add('material-symbols-outlined');
    del.textContent = 'delete';

    del.addEventListener('click', (e) => {
        deleteBook(e)
    })

    read = document.createElement('span')
    read.classList.add('material-symbols-outlined')
    if (book.read) {
        read.textContent = 'bookmark_added'
        read.classList.add('read')
    } else {
        read.textContent = 'turned_in_not'
    }

    read.addEventListener('click', (e) => {
        toggleReadProperty(e)
    })

    icons = createDiv('icons');
    icons.append(del, read);

    li = document.createElement('li');
    li.classList.add('book-card');
    li.append(title, author, pages, icons);

    return li
}

function deleteBook(e) {
    let book = getParentBookCard(e.target);
    let title = book.querySelector('.title').textContent;
    myBooks = myBooks.filter(book => !book.title.includes(title))
    book.remove();
}

function toggleReadProperty(e) {
    let book = getParentBookCard(e.target);
    let title = book.querySelector('.title').textContent;
    let index = myBooks.findIndex(book => book.title === title);

    if (e.target.textContent === 'bookmark_added') {
        e.target.textContent = 'turned_in_not'
        e.target.classList.remove('read')
        myBooks[index].read = false;
    } else {
        e.target.textContent = 'bookmark_added'
        e.target.classList.add('read')
        myBooks[index].read = true;
    }
}

function getParentBookCard(element) {
    let parent = element.parentNode;

    if (parent == document.body) {
        return
    }

    if (parent.classList.contains('book-card')) {
        return parent
    } else {
        return getParentBookCard(parent)
    }
}

// toggle form view
document.querySelector('.add-book').addEventListener('click', toggleAddBookForm)

function toggleAddBookForm() {
    let form = document.querySelector('.add-book-form')
    if (form.style.display !== 'block') {
        form.style.display = 'block'
        document.querySelector('.expand').textContent = 'expand_more'
    } else {
        form.style.display = 'none';
        document.querySelector('.expand').textContent = 'expand_less'
    }
}

// form submission
const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault(); // prevent page from reloading

    const formData = Object.fromEntries(new FormData(e.target));
    const newBook = new Book(formData.author, formData.title, Number(formData.pages), (formData.read === 'true'))
    addBook(newBook)
    
    resetForm()
}

// form reset

document.querySelector('.reset').addEventListener('click', resetForm)

function resetForm() {
    // select form
    let form = document.querySelector('.add-book-form')
    // reset inputs
    form.reset()

    // clear error messages
    let errorMsgs = form.querySelectorAll('.error')
    errorMsgs.forEach(element => {element.textContent = ''})

    // remove styling for invalid fields
    inputFields.forEach(element => element.style.border = '')
}

// form validation

const inputFields = document.querySelectorAll("input:not([type='radio'])")

inputFields.forEach(element => element.addEventListener('blur', (e) => {
    var span = e.target.nextElementSibling

    if (e.target.validity.valueMissing) {
        e.target.style.border = '1px solid red'
        span.textContent = 'Field is required'
    }
}))

inputFields.forEach(element => element.addEventListener('input', (e) => {
    var span = e.target.nextElementSibling
    console.log(e.target)

    if (!e.target.validity.valid) {
        showErrorMsg(e.target, span)
        e.target.style.border = '1px solid red'    
    } else {
        span.textContent = ''
        e.target.setCustomValidity = ''
        e.target.style.border = '1px solid green'
    }
}))

function showErrorMsg(input, span) {
    const validityState = input.validity;

    if (validityState.patternMismatch) {
        span.textContent = 'Author name cannot include numbers'
    } else if (validityState.tooShort) {
        span.textContent = 'Title is too short'
    } else if (validityState.valueMissing) {
        span.textContent = 'Field is required'
    } else if (validityState.rangeUnderflow) {
        span.textContent = 'Input must be greater than 0'
    }
}
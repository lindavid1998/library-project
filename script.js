function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}
let myBooks = [];

bookList = document.querySelector('.book-list')

function displayBooks() {
    for (let i = 0; i < myBooks.length; i++) {
        bookList.appendChild(createBookCard(myBooks[i]));
    }
}

function addBook(book) {
    myBooks.push(book)
    bookList.appendChild(createBookCard(book))
}

function createBookCard(book) {
    // input: book -> object
    // output: li element

    li = document.createElement('li');
    li.classList.add('book-card');

    title = document.createElement('div')
    title.classList.add('title')
    title.textContent = book.title

    author = document.createElement('div')
    author.classList.add('author')
    author.textContent = book.author
    
    pages = document.createElement('div')
    pages.classList.add('pages')
    pages.textContent = book.pages

    icons = document.createElement('div')
    icons.classList.add('icons')

    del = document.createElement('span')
    del.classList.add('material-symbols-outlined')
    del.textContent = 'delete';
    del.addEventListener('click', (e) => {
        card = e.target.parentElement.parentElement;
        card.remove();
    })

    read = document.createElement('span')
    read.classList.add('material-symbols-outlined')
    if (book.read === true) {
        read.textContent = 'bookmark_added'
        read.classList.add('read')
    } else {
        read.textContent = 'turned_in_not'
    }

    read.addEventListener('click', (e) => {
        if (e.target.textContent === 'bookmark_added') {
            e.target.textContent = 'turned_in_not'
            e.target.classList.remove('read')
        } else {
            e.target.textContent = 'bookmark_added'
            e.target.classList.add('read')
        }
    })

    icons.append(del, read);

    li.append(title, author, pages, icons);

    return li
}

// toggle form
document.querySelector('.add-book').addEventListener('click', toggleAddBookForm)

function toggleAddBookForm() {
    form = document.querySelector('.add-book-form')
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
    addBookForm.reset(); // reset form
}
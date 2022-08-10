// Array to store all books
const myLibrary = [];

// Book display container
const display = document.getElementById("books");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to create HTML elements with content and classes
function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
}

// Function to create the "mark as read" slider and set class of read books
function createReadElement(bookItem, book) {
  const read = document.createElement("div");
  read.setAttribute("class", "mark-read");
  read.appendChild(createBookElement("p", "Mark as read:"));
  const label = createBookElement("label", "", "switch");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.classList.add("read");
      book.read = true;
    } else {
      bookItem.classList.remove("read");
      book.read = false;
    }
  });
  if (book.read) {
    checkbox.checked = true;
    bookItem.classList.add("read");
  }
  const slider = createBookElement("span", "", "slider round");
  label.insertAdjacentElement("beforeend", checkbox);
  label.insertAdjacentElement("beforeend", slider);
  read.appendChild(label);
  return read;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  render();
}

// Function to create all of the visible book content
function createBook(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card");
  bookItem.appendChild(createBookElement("h3", book.title, "book-title"));
  bookItem.appendChild(createBookElement("h3", book.author));
  bookItem.appendChild(createBookElement("h3", `${book.pages} pages`));
  bookItem.appendChild(createBookElement("button", "Delete", "delete-btn"));
  bookItem.appendChild(createReadElement(bookItem, book));

  bookItem.querySelector(".delete-btn").addEventListener("click", () => {
    console.log(index);
    deleteBook(index);
  });

  display.insertAdjacentElement("beforeend", bookItem);
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const form = document.getElementById("book-form");
const submitBtn = document.getElementById("submit-book");

window.addEventListener("click", (e) => {
  if (e.target === overlay) {
    toggleModal();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value;
  const author = document.getElementById("author-input").value;
  const pages = document.getElementById("pages-input").value;
  const read = document.getElementById("read-input").checked;
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  form.reset();
  toggleModal();
  render();
});

function toggleModal() {
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    modal.classList.add("active");
    overlay.classList.add("active");
  }
}

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  toggleModal();
});

function createAddBtn() {
  const addBtn = document.createElement("div");
  addBtn.id = "add-btn";
  addBtn.appendChild(createBookElement("p", "+"));
  addBtn.addEventListener("click", toggleModal);
  display.appendChild(addBtn);
}

// Function to render the page and display all books
function render() {
  display.textContent = "";
  myLibrary.map((book, index) => {
    createBook(book, index);
  });
  createAddBtn();
}
render();

const myLibrary = [];
// let id;
//Constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = self.crypto.randomUUID();
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ID: #${this.id}`;
  };
}
//End Constructor

//Prototype toggle read
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};
//End Prototype toggle read

//Add function to array
function addNewBook(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}
//End Add function to array

//Render Book List
function displayBook() {
  const renderContainer = document.querySelector("#book-list");
  renderContainer.innerHTML = "";

  myLibrary.forEach((Book) => {
    //Book Cards
    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("data-id", Book.id);

    //Book Title
    const title = document.createElement("h3");
    title.textContent = Book.title;
    card.appendChild(title);

    //Book Author
    const author = document.createElement("p");
    author.textContent = `Author: ${Book.author}`;
    card.appendChild(author);

    //Book Page
    const page = document.createElement("p");
    page.textContent = `Pages: ${Book.pages} `;
    card.appendChild(page);

    //Book status
    const read = document.createElement("p");
    read.textContent = `Status: `;
    const statusSpan = document.createElement("span");
    statusSpan.className = "read-status";
    statusSpan.textContent = Book.isRead ? "✔️" : "❌";
    read.appendChild(statusSpan);
    card.appendChild(read);

    //Toggle Status
    const toggleReadBTN = document.createElement("button");
    toggleReadBTN.className = "toggle-read-btn btn";
    toggleReadBTN.setAttribute("data-id", Book.id);
    toggleReadBTN.textContent = "Toggle Read";
    card.appendChild(toggleReadBTN);

    //Delete Button
    const deleteBTN = document.createElement("button");
    deleteBTN.className = "delete-btn btn";
    deleteBTN.setAttribute("data-id", Book.id);
    deleteBTN.textContent = "Remove";
    card.appendChild(deleteBTN);

    renderContainer.append(card);
  });
}
//End Render Book List

//Button Function
document.querySelector("#book-list").addEventListener("click", function (e) {
  const id = e.target.getAttribute("data-id");
  //Delete button
  if (e.target.classList.contains("delete-btn")) {
    const index = myLibrary.findIndex((Book) => Book.id === id);
    if (index != -1) {
      myLibrary.splice(index, 1);
      displayBook();
    }
  }
  //Toggle Read button
  if (e.target.classList.contains("toggle-read-btn")) {
    const book = myLibrary.find((Book) => Book.id === id);
    if (book) {
      book.toggleRead();
      displayBook();
    }
  }
});
//End Button Function

//Show modal dialog
const dialog = document.querySelector(".book-dialog");
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
  dialog.showModal();
});

//End Show modal dialog

//Submit handling
const cancelBtn = document.querySelector("#cancel-btn");
const form = document.querySelector("#dialog-form");
const alert = document.querySelector(".alert");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = document.querySelector("#pages").value.trim();
  const read = document.querySelector("#isRead").checked;
  // if (!title || !author || !pages) {
  //   alert.innerHTML = "";
  //   const alertP = document.createElement("p");
  //   alertP.textContent = "Please fill in the title, author, and page number information.";
  //   alert.appendChild(alertP);
  //   e.preventDefault();
  //   return;
  // }
  addNewBook(title, author, pages, read);
  displayBook();
  form.reset();
  dialog.close();
});
cancelBtn.addEventListener("click", () => {
  alert.innerHTML = "";
  form.reset();
  dialog.close();
});

//End Submit handling

// const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295");
addNewBook("The Hobbit", "J.R.R. Tolkien", "295");
addNewBook("The Great Gatsby", "F. Scott Fitzgerald", "218");
addNewBook("1984", "George Orwell", "328");
displayBook();
console.log(myLibrary);

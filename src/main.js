import MessageHandler from "./MessageHandler";
import Book from "./Book";
import "./scss/main.scss"

/**
 * Responsible for handling the logical flow of the app
 */
class App {
    // Input fields
    #bTitle;
    #aName;
    #isbn;

    // Output fields
    #displayContent;
    
    // Buttons
    #submitBtn;
    #clearBtn;

    #books;

    constructor() {
        this.#bTitle = document.querySelector("#main .insert input[name='b-title']");
        this.#aName = document.querySelector("#main .insert input[name='a-name']");
        this.#isbn = document.querySelector("#main .insert input[name='isbn']");

        this.#displayContent = document.querySelector("#main .display .display-content");
        this.#submitBtn = document.querySelector("#main .insert #submit");
        this.#clearBtn = document.querySelector("#main .insert #clear");

        this.#books;
    }

    // Limits the input characters to numbers and the '-'
    /**
     * Listens to the event and prevents any input to the field according to the regex
     * 
     * @param {Object} event 
     */
    #isbnInputHandler(event) {
        const re = /[0-9]{10}/;
        const re2 = /[0-9]/;
        if((!re2.test(event.key) || re.test(event.target.value)) && event.which !== 8) {
            event.preventDefault();
        }
    }

    /**
     * Listens to the event and prevents any input to the field according to the regex
     * 
     * @param {Object} event 
     */
    #aNameInputHandler(event) {
        const re = /[a-zA-Z ]+/;
        if(!re.test(event.key) && event.which !== 8) {
            event.preventDefault();
        }
    }

    /**
     * Delets all the books
     */
    #deleteBooks = () => {
        window.localStorage.clear();
        this.#displayContent.innerHTML = "";
    }

    /**
     * Delets the selected book
     * 
     * @param {Object} event 
     */
    #deleteBook = (event) => {
        const parent = event.target.parentElement;
        for(let book of this.#books) {
            if(book.bookTitle === parent.children[0].textContent && book.isbn == parent.children[2].textContent) {
                const index = this.#books.indexOf(book);
                this.#books.splice(index, 1);
                window.localStorage.setItem("books", JSON.stringify(this.#books));
                parent.remove();
            }
        }
    }

    /**
     * Adds a book into the local storage of the browser
     * 
     * @returns -1 in case the values haven't been field correctly
     */
    #addBook = () => {
        // Check if the input fields are empty and display an error msg
        if(!this.#bTitle.value || (!this.#aName.value || this.#aName.value.length < 2) || (!this.#isbn.value || this.#isbn.value.length < 10)) {
            MessageHandler.displayError("Fill in the required fields.", 3000);
            return -1;
        }

        // Instanciate new book object
        const newBook = {
            bookTitle: this.#bTitle.value,
            authorName: this.#aName.value,
            isbn: this.#isbn.value
        }

        // Save the new book
        let saved = window.localStorage.getItem("books");

        if(!saved) {
            this.#books = [];
            this.#books.push(newBook);
        } else {
            this.#books = JSON.parse(saved);
            this.#books.push(newBook);
        }
        window.localStorage.setItem("books", JSON.stringify(this.#books));
        MessageHandler.displaySuccess("Book added successfully.", 1500)

        this.#bTitle.value = "";
        this.#aName.value = "";
        this.#isbn.value = "";
        
        this.#displayBooks();
    }

    /**
     * Displays the books on the DOM
     */
    #displayBooks() {
        this.#displayContent.innerHTML = "";
        for(let i = 0; i < this.#books.length; ++i) {
            let book = new Book(this.#books[i].bookTitle, this.#books[i].authorName, this.#books[i].isbn);

            const infoDiv = book.getInfoDiv();
            infoDiv.addEventListener("click", this.#deleteBook);
            this.#displayContent.appendChild(infoDiv);
        }
    }

    /**
     * Loads all necessary event listeners
     */
    loadEventListeners() {
        this.#isbn.addEventListener("keydown", this.#isbnInputHandler);
        this.#aName.addEventListener("keydown", this.#aNameInputHandler);
        this.#submitBtn.addEventListener("click", this.#addBook);
        this.#clearBtn.addEventListener("click", this.#deleteBooks);
    }
    
}

const handler = new App();
handler.loadEventListeners();
class Book {
    #bookTitle;
    #authorName;
    #isbn;
    
    constructor(bookTitle, authorName, isbn) {
        this.#bookTitle = bookTitle;
        this.#authorName = authorName;
        this.#isbn = isbn;
    }

    getInfoDiv() {
        const info = document.createElement("div");
        info.className = "book";
        info.innerHTML = `<span class="book-label">${this.#bookTitle}</span>
                        <span class="book-label">${this.#authorName}</span>
                        <span class="book-label">${this.#isbn}</span>`
        return info;
    }
}

Object.freeze(Book);

export default Book;

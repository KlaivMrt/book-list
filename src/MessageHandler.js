class MessageHandler {
    static #clearMessage(element) {
        element.remove();
    }

    static displayError (message, time) {
        let error = document.querySelector(".error");
        if(!error) {
            error = document.createElement("div");
            error.className = "error message"
            error.textContent = message;
            document.body.insertBefore(error, document.body.children[1])
            setTimeout(() => this.#clearMessage(error), time);
        }
    }

    static displaySuccess(message, time) {
        let success = document.querySelector(".success");
        if(!success) {
            success = document.createElement("div");
            success.className = "success message"
            success.textContent = message;
            document.body.insertBefore(success, document.body.children[1]);
            setTimeout(() => this.#clearMessage(success), time);
        }
    }
}

Object.freeze(MessageHandler);

export default MessageHandler;

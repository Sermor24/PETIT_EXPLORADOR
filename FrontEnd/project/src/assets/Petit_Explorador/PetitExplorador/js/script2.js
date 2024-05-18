document.addEventListener("DOMContentLoaded", function() {
    const words = ["La", "roda", "de", "la", "meua", "moto", 'està', 'punxada'];

    const wordContainer = document.getElementById("word-container");
    const sentenceContainer = document.getElementById("sentence-container");

    // Función para crear las palabras
    function createWords() {
        words.sort(() => Math.random() - 0.5);

        words.forEach(word => {
            const wordElement = document.createElement("div");
            wordElement.classList.add("word");
            wordElement.textContent = word;
            wordContainer.appendChild(wordElement);

            // evento de clic para mover palabras al contenedor de oraciones
            wordElement.addEventListener("click", function(event) {
                moveWordToSentenceContainer(event.target);
            });
        });
    }

    // Función para mover una palabra al contenedor de oraciones
    function moveWordToSentenceContainer(wordElement) {
        const wordText = wordElement.textContent;
        const newWordElement = document.createElement("div");
        newWordElement.classList.add("word");
        newWordElement.textContent = wordText;
        sentenceContainer.appendChild(newWordElement);

        // Elimina la palabra del contenedor de palabras
        wordContainer.removeChild(wordElement);

        // Agrega de nuevo el event listener al nuevo elemento de palabra en el contenedor de oraciones
        newWordElement.addEventListener("click", function(event) {
            moveWordToWordContainer(event.target);
        });
    }

    // Función para mover una palabra al contenedor de palabras
    function moveWordToWordContainer(wordElement) {
        const wordText = wordElement.textContent;
        const newWordElement = document.createElement("div");
        newWordElement.classList.add("word");
        newWordElement.textContent = wordText;
        wordContainer.appendChild(newWordElement);

        // Elimina la palabra del contenedor de oraciones
        sentenceContainer.removeChild(wordElement);

        // Agrega de nuevo el event listener al nuevo elemento de palabra en el contenedor de palabras
        newWordElement.addEventListener("click", function(event) {
            moveWordToSentenceContainer(event.target);
        });
    }

    // Función para inicializar el juego
    function initGame() {
        createWords();
        
        sentenceContainer.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        sentenceContainer.addEventListener("drop", function(event) {
            event.preventDefault();
        });

        const checkButton = document.getElementById("check-button");
        checkButton.addEventListener("click", function() {
            checkSentence();
        });
    }

    // Función para verificar la oración formada
    function checkSentence() {
        const sentence = Array.from(sentenceContainer.children).map(word => word.textContent).join(" ");
        const correctSentence = "La roda de la meua moto està punxada";
        if (sentence === correctSentence) {
            // Muestra el modal
            const modal = document.getElementById("myModal");
            modal.style.display = "block";
    
            // Agrega la lógica para cerrar el modal cuando se hace clic en el botón de cierre
            const closeButton = document.getElementsByClassName("close")[0];
            closeButton.onclick = function() {
                modal.style.display = "none";
            }
        } else {
            alert("La oración no es correcta. Por favor, inténtalo de nuevo.");
        }
    }

    initGame();

});

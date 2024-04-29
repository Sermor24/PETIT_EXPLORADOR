// Función para seleccionar una opción y proporcionar retroalimentación
function selectOption(questionNumber, option) {
    const optionsContainer = document.querySelector('.activity-container').children[questionNumber - 1].querySelector('.options');
    const options = Array.from(optionsContainer.children);

    // Quitamos la clase 'selected' de todas las opciones
    options.forEach(button => {
        button.classList.remove('selected');
        button.classList.remove('correct'); // Eliminamos la clase correct
        button.classList.remove('incorrect'); // Eliminamos la clase incorrect
    });

    // Añadimos la clase 'selected' a la opción seleccionada
    const selectedOption = options.find(button => button.innerText.trim() === option.trim());
    selectedOption.classList.add('selected');

    // Mostramos el mensaje de retroalimentación
    if (selectedOption.classList.contains('yes')) {
        showFeedbackMessage("¡Correcto!");
        selectedOption.classList.add('correct');
    } else {
        showFeedbackMessage("¡Incorrecto!");
        selectedOption.classList.add('incorrect');
    }
}

// Función para mostrar un mensaje de retroalimentación
function showFeedbackMessage(message) {
    const feedbackMessageContainer = document.getElementById('feedback-message');
    feedbackMessageContainer.innerText = message;
    feedbackMessageContainer.classList.remove('hidden'); // Agrega esta línea
}
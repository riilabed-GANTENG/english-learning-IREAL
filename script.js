// ==========================
// NAVIGATION
// ==========================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "quiz") {
        loadQuestion();
    }
}


// ==========================
// VOCABULARY
// ==========================

const vocabulary = [

    {
        word: "Beautiful",
        meaning: "Cantik / Indah",
        example: "The garden is beautiful."
    },

    {
        word: "Difficult",
        meaning: "Sulit",
        example: "This question is difficult."
    },

    {
        word: "Improve",
        meaning: "Meningkatkan",
        example: "I want to improve my English."
    },

    {
        word: "Knowledge",
        meaning: "Pengetahuan",
        example: "Reading increases our knowledge."
    },

    {
        word: "Environment",
        meaning: "Lingkungan",
        example: "We should protect the environment."
    }

];

let vocabularyIndex = 0;


function displayVocabulary() {

    document.getElementById("word").textContent =
        vocabulary[vocabularyIndex].word;

    document.getElementById("meaning").textContent =
        "Meaning: " + vocabulary[vocabularyIndex].meaning;

    document.getElementById("example").textContent =
        "Example: " + vocabulary[vocabularyIndex].example;
}


function nextWord() {

    vocabularyIndex++;

    if (vocabularyIndex >= vocabulary.length) {
        vocabularyIndex = 0;
    }

    displayVocabulary();
}


// ==========================
// PRONUNCIATION
// ==========================

function speakWord() {

    const word =
        vocabulary[vocabularyIndex].word;

    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
}


// ==========================
// QUIZ
// ==========================

const questions = [

    {
        question: "What is the meaning of 'Beautiful'?",
        answers: [
            "Sulit",
            "Cantik / Indah",
            "Cepat",
            "Pengetahuan"
        ],
        correct: 1
    },

    {
        question: "What is the meaning of 'Difficult'?",
        answers: [
            "Mudah",
            "Indah",
            "Sulit",
            "Lambat"
        ],
        correct: 2
    },

    {
        question: "What does 'Improve' mean?",
        answers: [
            "Meningkatkan",
            "Mengurangi",
            "Menghentikan",
            "Membaca"
        ],
        correct: 0
    },

    {
        question: "What does 'Knowledge' mean?",
        answers: [
            "Lingkungan",
            "Pengetahuan",
            "Pertanyaan",
            "Jawaban"
        ],
        correct: 1
    },

    {
        question: "What does 'Environment' mean?",
        answers: [
            "Pengetahuan",
            "Lingkungan",
            "Kesulitan",
            "Kemampuan"
        ],
        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


function loadQuestion() {

    if (currentQuestion >= questions.length) {

        showResult();

        return;
    }

    answered = false;

    const question =
        questions[currentQuestion];

    document.getElementById("question").textContent =
        (currentQuestion + 1) + ". " + question.question;

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        const button =
            document.createElement("button");

        button.textContent = answer;

        button.className = "answer-btn";

        button.onclick = function() {

            checkAnswer(index);
        };

        answersContainer.appendChild(button);

    });

}


function checkAnswer(selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer =
        questions[currentQuestion].correct;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

}


function nextQuestion() {

    if (!answered) {

        alert("Please choose an answer first.");

        return;
    }

    currentQuestion++;

    loadQuestion();
}


// ==========================
// RESULT
// ==========================

function showResult() {

    const percentage =
        Math.round((score / questions.length) * 100);

    document.getElementById("quiz-container").style.display =
        "none";

    document.getElementById("result").innerHTML =
        "Your Score: " +
        score +
        "/" +
        questions.length +
        "<br>Percentage: " +
        percentage +
        "%";

    document.getElementById("restart").style.display =
        "inline-block";
}


// ==========================
// RESTART QUIZ
// ==========================

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    document.getElementById("quiz-container").style.display =
        "block";

    document.getElementById("result").innerHTML = "";

    document.getElementById("restart").style.display =
        "none";

    loadQuestion();
}


// Start vocabulary
displayVocabulary();

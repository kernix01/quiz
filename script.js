const answers = document.querySelector("#answers");
const score = document.querySelector("#score");
const quizProg = document.querySelector("#quiz-progress");
const progressPercent = document.querySelector("#progress-percent");
const finalScore = document.querySelector("#final-score");
const nBtn = document.querySelector("#next-button");
const answerOptions = document.querySelectorAll(".answer-option");
const qText = document.querySelector("#question-text");
const questionScreen = document.querySelector("#question-screen");
const resultScreen = document.querySelector("#result-screen");
const restartBtn = document.querySelector("#restart-button");
const progressBar = document.querySelector("#progress-value");

const questions = [
    {text: 'Какой метод находит первый элемент по CSS-селектору?', answer: 0, options: [
        "querySelector()",
        "createElement()",
        "addEventListener()",
        "append()",
    ]},

    {text: 'Как вывести результат в консоль?', answer: 2, options: [
        "console.error()",
        "console.warn()",
        "console.log()",
        "alert()"
    ]},

    {text: 'Как переключить CSS-класс DOM-элемента?', answer: 3, options: [
        "btn.style.color",
        "btn.textContent",
        "btn.classList.remove()",
        "btn.classList.toggle()"
    ]},

    {text: 'Какой метод строки убирает пробелы по краям?', answer: 0, options: [
        "msg.trim()",
        "msg.split()",
        "msg.length",
        "msg.toLowerCase()"
    ]},

    {text: 'Какой переменной нельзя повторно присвоить другое значение?', answer: 1, options: [
        "let",
        "const",
        "var",
        "null"
    ]}
]

let currentQuestionIndex = 0;
let correctAnswers = 0;

answers.addEventListener("click", (e) => {
    // Находим кнопку ответа, по которой нажали
    const button = e.target.closest(".answer-option");

    // Запоминаем, была ли она уже выбрана
    const wasSelected = button.classList.contains("is-selected");

    // Снимаем выделение со всех ответов
    answerOptions.forEach((option) => {
        option.classList.remove("is-selected");
    });

    // Выделяем кнопку, только если раньше она не была выбрана
    if (!wasSelected) {
        button.classList.add("is-selected");
    }

    const selectedAnswer = answers.querySelector(".is-selected");

    if (selectedAnswer === null) {
        nBtn.disabled = true;
    } else {
        nBtn.disabled = false;
    }
});

nBtn.addEventListener("click", () => {
    
    const selectedAnswer = document.querySelector(".is-selected");

    const selectedIndex = Number(selectedAnswer.dataset.index);
   
    const correctIndex = Number(questions[currentQuestionIndex].answer);

    if (selectedIndex === correctIndex) {
    correctAnswers += 1;
    }
    
    currentQuestionIndex += 1;
    
    if (currentQuestionIndex < questions.length) {
        qText.textContent = questions[currentQuestionIndex].text 

        const percent = (currentQuestionIndex + 1) / questions.length * 100;

        progressPercent.textContent = `${percent}%`;
        quizProg.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
        progressBar.style.width = `${percent}%`;
        
        answerOptions.forEach((option, index) => {
            const answerText = option.querySelector(".answer-text");

            answerText.textContent = questions[currentQuestionIndex].options[index];

            option.classList.remove("is-selected");
        });
    } else {
        finalScore.textContent = correctAnswers;
        questionScreen.hidden = true;
        resultScreen.hidden = false;
    }
    
   nBtn.disabled = true; 

   score.textContent = correctAnswers;
});

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    
    questionScreen.hidden = false;
    resultScreen.hidden = true;

    score.textContent = correctAnswers;
    qText.textContent = questions[currentQuestionIndex].text;

    const percent = (currentQuestionIndex + 1) / questions.length * 100;

    progressPercent.textContent = `${percent}%`;
    quizProg.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
    progressBar.style.width = `${percent}%`;

    answerOptions.forEach((option, index) => {
        const answerText = option.querySelector(".answer-text");

        answerText.textContent = questions[currentQuestionIndex].options[index];

        option.classList.remove("is-selected");
    });

    nBtn.disabled = true;
});
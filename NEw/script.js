const quiz = {
    "What activity do you enjoy the most in your free time?": {
        a: "Analyzing data or solving puzzles.",
        b: "Helping others or volunteering.",
        c: "Designing or creating something new.",
        d: "Leading a group or team."
    },
    "What type of work environment do you prefer?": {
        a: "A structured and organized office setting.",
        b: "A dynamic and fast-paced environment.",
        c: "A creative and innovative workspace.",
        d: "A collaborative and team-oriented culture."
    },
    "Which skills do you believe you excel at the most?": {
        a: "Logical thinking and problem-solving.",
        b: "Communication and empathy.",
        c: "Artistic or design abilities.",
        d: "Leadership and decision-making."
    },
    "What kind of impact do you want to make in your career?": {
        a: "Contributing to scientific advancements.",
        b: "Improving people's lives and well-being.",
        c: "Inspiring others through creativity.",
        d: "Driving change and innovation in organizations."
    },
    "What interests you the most about a job?": {
        a: "Opportunities for career advancement and growth.",
        b: "Making a positive difference in the world.",
        c: "Expressing your creativity and ideas.",
        d: "Taking on challenges and leading projects."
    }
};

const quizForm = document.getElementById('quiz-form');
const questionsContainer = document.getElementById('questions-container');
const resultDiv = document.getElementById('result');
const progressDiv = document.getElementById('quiz-progress');

let currentQuestion = 0;
const questions = Object.keys(quiz);

function showQuestion() {
    const question = questions[currentQuestion];
    const options = quiz[question];

    progressDiv.innerHTML = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionsContainer.innerHTML = '';
    questionsContainer.style.display = 'block';
    resultDiv.style.display = 'none';

    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${question}</p>`;
    for (const [option, text] of Object.entries(options)) {
        const optionLabel = document.createElement('label');
        optionLabel.className = 'option-label';

        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'answer';
        optionInput.value = option;
        optionLabel.appendChild(optionInput);

        optionLabel.innerHTML += `${option}) ${text}`;
        questionDiv.appendChild(optionLabel);

        questionDiv.appendChild(document.createElement('br'));
    }
    questionsContainer.appendChild(questionDiv);
}

function showResult() {
    const answers = [];
    const answerInput = document.querySelector('input[name="answer"]:checked');

    if (!answerInput) {
        alert('Please select an answer.');
        return;
    }

    answers.push(answerInput.value);

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        quizForm.style.display = 'none';
        progressDiv.style.display = 'none';

        // Calculate the most frequent answer
        const mostFrequentAnswer = answers.sort((a, b) =>
            answers.filter(v => v === a).length -
            answers.filter(v => v === b).length
        ).pop();

        // Career path based on the most frequent answer
        const careerPaths = {
            a: "data analysis, engineering, or finance",
            b: "healthcare, social work, counseling, or education",
            c: "graphic design, marketing, writing, or any artistic field",
            d: "managerial roles, entrepreneurship, or project management positions"
        };

        const result = careerPaths[mostFrequentAnswer];
        resultDiv.innerText = `Based on your answers, your potential career path could be in ${result}.`;
        resultDiv.style.display = 'block';
    }
}

quizForm.addEventListener('submit', function (event) {
    event.preventDefault();
    showResult();
});

showQuestion();

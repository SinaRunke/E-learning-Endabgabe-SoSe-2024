const questions = [
    {
        question: "Welche Interaktionsmöglichkeiten gibt es mit Medienfiguren?",
        options: ["Den Alltag einer Medienfigur nachahmen.",
                  "Über einen Influencer mit anderen Menschen sprechen.",
                  "Jegliche Arten von Medienkonsum."],
        answer: 2,
        firstExplanation: "Den Alltag einer Medienfigur nachahmen oder über einen Influencer sprechen sind ebenfalls Interaktionsmöglichkeiten, aber nicht alle.",
        secondExplanation: "Jegliche Arten von Medienkonsum zählen zu den Interaktionsmöglichkeiten."
    },
    {
        question: "Was sind die negativen Auswirkungen parasozialer Beziehungen auf den Rezipienten?",
        options: ["Der Rezipient kompensiert seine Einsamkeit.",
                  "Soziale, beidseitig reale Kontakte gehen zurück.",
                  "Die Privatsphäre der Medienfigur wird eingeschränkt."],
        answer: 1,
        firstExplanation: "Das Kompensieren von Einsamkeit ist eine mögliche Folge, jedoch nicht die negativste Auswirkung.",
        secondExplanation: "Parasoziale Beziehungen können dazu führen, dass reale soziale Kontakte zurückgehen."
    },
    {
        question: "Wie entstehen parasoziale Beziehungen?",
        options: ["Durch häufige Interaktion mit Medienfiguren.",
                  "Durch einmalige Interaktion mit Medienfiguren.",
                  "Durch ähnliche Charaktereigenschaften des Rezipienten mit einer Medienfigur."],
        answer: 0,
        firstExplanation: "Einmalige Interaktion reicht nicht aus, um eine parasoziale Beziehung aufzubauen.",
        secondExplanation: "Parasoziale Beziehungen entstehen durch häufige Interaktionen mit Medienfiguren."
    },
    {
        question: "Was beschreibt die Identifikation des Rezipienten einer Medienfigur?",
        options: ["Eine rein passive Beziehung, in der der Rezipient die Medienfigur nur als Unterhaltung betrachtet.",
                  "Der Prozess, in dem sich die Nutzer vorstellen, ein bestimmter Charakter zu sein und die Rolle und Perspektive des Charakters einnehmen.",
                  "Eine kritische Distanz die der Rezipient gegenüber der Medienfigur aufbaut, aufgrund von unterschiedlichen Meinungen."],
        answer: 1,
        firstExplanation: "Verkleidung beschreibt keine Identifikation.",
        secondExplanation: "Identifikation bedeutet, dass Nutzer sich vorstellen, ein bestimmter Charakter zu sein."
    },
    {
        question: "Wovon hängt es ab, dass Rezipienten sich mit Medienpersonen identifizieren, anstatt eine Beziehung aufzubauen?",
        options: ["Es ist geschlechtsabhängig.",
                  "Von der Häufigkeit des direkten Kontakts mit der Medienfigur.",
                  "Von ähnlichen Charaktereigenschaften und persönliche Interessen des Rezipienten und der Medienfigur."],
        answer: 2,
        firstExplanation: "Der direkte Kontaktaufbau ist nicht entscheidend für die Identifikation.",
        secondExplanation: "Die Identifikation hängt von ähnlichen Charaktereigenschaften zwischen Rezipient und Medienfigur ab."
    },
    {
        question: "Welche Faktoren haben besonders großen Einfluss auf die Identifikation mit einem Mediencharakter?",
        options: ["Neutralen Berichterstattungen der Medienfigur.",
                  "Statur, Weltbildanschauung, Alter, Charaktereigenschaften, Interessen.",
                  "Interessenskonflikte."],
        answer: 1,
        firstExplanation: "Wetterverhältnisse sind irrelevant für die Identifikation.",
        secondExplanation: "Man kann sich mit einer Medienperson anhand von Statur, Weltbildanschauung, politischer Einstellung und Alter identifizieren."
    }
];

let attempts = new Array(questions.length).fill(0);
let correctAnswers = new Array(questions.length).fill(false);
let quizCompleted = false;

function loadQuestions() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    questions.forEach((question, qIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-item');
        questionElement.innerHTML = `
            <div class="question">${question.question}</div>
            <ul class="options">
                ${question.options.map((option, index) => `
                    <li>
                        <label>
                            <input type="radio" name="question${qIndex}" value="${index}">
                            ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
            <div id="feedback${qIndex}" class="feedback"></div>
        `;
        quizContainer.appendChild(questionElement);
    });
}

function submitAllAnswers() {
    let allCorrect = true;
    questions.forEach((_, qIndex) => {
        const isCorrect = submitAnswer(qIndex);
        if (!isCorrect) {
            allCorrect = false;
        }
    });
    if (allCorrect) {
        displayCongratsMessage();
    }
}

function submitAnswer(qIndex) {
    const selectedOption = document.querySelector(`input[name="question${qIndex}"]:checked`);
    const feedbackContainer = document.getElementById(`feedback${qIndex}`);
    
    if (!selectedOption) {
        feedbackContainer.innerHTML = "Bitte wähle eine Antwort aus!";
        feedbackContainer.classList.remove('correct');
        return false;
    }

    const answer = parseInt(selectedOption.value, 10);
    const currentQuestion = questions[qIndex];
    attempts[qIndex] += 1;

    if (answer === currentQuestion.answer) {
        displayFeedback(qIndex, true);
        correctAnswers[qIndex] = true;
        return true;
    } else {
        displayFeedback(qIndex, false);
        correctAnswers[qIndex] = false;
        return false;
    }
}

function displayFeedback(qIndex, isCorrect) {
    const feedbackContainer = document.getElementById(`feedback${qIndex}`);
    if (isCorrect) {
        feedbackContainer.innerHTML = "Sehr gut, das war richtig!";
        feedbackContainer.classList.add('correct');
    } else {
        const explanation = (attempts[qIndex] === 1) ? questions[qIndex].firstExplanation : questions[qIndex].secondExplanation;
        feedbackContainer.innerHTML = `Das war leider falsch. <br>${explanation}`;
        feedbackContainer.classList.remove('correct');
    }
}

function displayCongratsMessage() {
    const submitButton = document.getElementById('submit-button');
    const totalQuestions = questions.length;
    const score = correctAnswers.every(isCorrect => isCorrect) ? 100 : 0;

    if (score === 100) {
        const congratsMessage = document.createElement('p');
        congratsMessage.id = 'congrats-message';
        congratsMessage.innerHTML = 'Herzlichen Glückwunsch! Alle Fragen wurden richtig beantwortet.';
        submitButton.insertAdjacentElement('afterend', congratsMessage);
    }

    const messageAndVideoContainer = document.getElementById('message-and-video-container');
    messageAndVideoContainer.classList.remove('hidden');
    playFinalVideo();

    const scoreMessage = document.createElement('p');
    scoreMessage.id = 'score-message';
    scoreMessage.innerHTML = `Dein Punktestand: ${score}%`;
    submitButton.insertAdjacentElement('afterend', scoreMessage);
}

function playFinalVideo() {
    const finalVideo = document.getElementById('final-video');
    finalVideo.play().catch(error => {
        console.error('Video playback failed:', error.message);
    });
}

function retryQuiz() {
    attempts.fill(0);
    correctAnswers.fill(false);
    quizCompleted = false;
    const congratsMessage = document.getElementById('congrats-message');
    if (congratsMessage) {
        congratsMessage.remove();
    }
    const scoreMessage = document.getElementById('score-message');
    if (scoreMessage) {
        scoreMessage.remove();
    }
    const messageAndVideoContainer = document.getElementById('message-and-video-container');
    messageAndVideoContainer.classList.add('hidden');
    const retryButton = document.getElementById('retry-button');
    retryButton.classList.add('hidden');
    loadQuestions();
}

window.onload = function() {
    const introVideo = document.getElementById('intro-video');
    introVideo.onended = function() {
        document.getElementById('video-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        document.getElementById('submit-button').classList.remove('hidden');
        loadQuestions();
    };
};

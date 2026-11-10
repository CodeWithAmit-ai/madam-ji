
// =====================================
// MADAM JI - MAIN JAVASCRIPT
// PHASE 1 + PHASE 2
// =====================================


// 1. Get HTML Elements

const welcomeScreen = document.getElementById("welcomeScreen");

const enterButton = document.getElementById("enterButton");

const revealScreen = document.getElementById("revealScreen");

const exploreButton = document.getElementById("exploreButton");

const backButton = document.getElementById("backButton");

const dashboardScreen = document.getElementById("dashboardScreen");

const musicButton = document.getElementById("musicButton");

const musicIcon = document.getElementById("musicIcon");

const musicText = document.getElementById("musicText");

const backgroundMusic = document.getElementById("backgroundMusic");

const particles = document.getElementById("particles");


// 2. Screen Navigation

// Welcome screen -> Reveal screen

enterButton.addEventListener("click", () => {

    revealScreen.classList.add("active");

    if (backgroundMusic.paused) {
        playMusic();
    }

});


// Reveal screen -> Welcome screen

backButton.addEventListener("click", () => {

    revealScreen.classList.remove("active");

});


// Reveal screen -> Dashboard

exploreButton.addEventListener("click", () => {

    revealScreen.classList.remove("active");

    welcomeScreen.style.display = "none";

    dashboardScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 3. Music Controls

async function playMusic() {

    try {

        await backgroundMusic.play();

        musicIcon.textContent = "♫";

        musicText.textContent = "SOUND ON";

    } catch (error) {

        musicText.textContent = "SOUND OFF";

        console.log("Music could not start:", error);

    }

}


function pauseMusic() {

    backgroundMusic.pause();

    musicIcon.textContent = "♫";

    musicText.textContent = "SOUND OFF";

}


musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

});


// 4. Floating Particles

const particleSymbols = ["♥", "✦", "✧"];

function createParticle() {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.textContent =
        particleSymbols[
            Math.floor(Math.random() * particleSymbols.length)
        ];

    particle.style.left = Math.random() * 100 + "%";

    particle.style.fontSize =
        (Math.random() * 10 + 9) + "px";

    const duration = Math.random() * 8 + 8;

    particle.style.animationDuration = duration + "s";

    particles.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, duration * 1000);

}


// Generate Particles

setInterval(createParticle, 1000);

for (let i = 0; i < 8; i++) {

    setTimeout(createParticle, i * 300);

}


// 5. Feature Modal

const featureModal = document.getElementById("featureModal");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const modalClose = document.getElementById("modalClose");

const modalOkay = document.getElementById("modalOkay");


// Feature information

const features = {

    letters: {
        title: "Love Letters",
        description: "A collection of little thoughts, sweet words and messages waiting to be discovered."
    },

    yesno: {
        title: "Yes or No",
        description: "Ready for a little game? Some interesting questions are waiting for you."
    },

    truth: {
        title: "Truth or Dare",
        description: "A little honesty, a little laughter and some fun challenges. You can always skip a question."
    },

    secret: {
        title: "Secret Room",
        description: "Not everything should be revealed at once. Some surprises deserve their own moment."
    },

    surprise: {
        title: "Final Surprise",
        description: "This little surprise is being saved for the perfect moment."
    }

};


// Open feature popup

// Open feature popup or game

const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach((card) => {

    card.addEventListener("click", () => {

        const featureName = card.dataset.feature;
// Open Love Letters
if (featureName === "letters") {

    dashboardScreen.classList.remove("active");

    lettersScreen.classList.add("active");

    resetLetters();

    window.scrollTo(0, 0);

    return;
}
// Open Surprise Me
if (featureName === "surprise") {

    dashboardScreen.classList.remove("active");

    surpriseScreen.classList.add("active");

    resetSurprise();

    window.scrollTo(0, 0);

    return;
}
        // Open Yes or No game
        if (featureName === "yesno") {

            dashboardScreen.classList.remove("active");

            yesNoScreen.classList.add("active");

            showGameIntro();

            window.scrollTo(0, 0);

            return;
        }
        // Open Truth or Dare game
if (featureName === "truth") {

    dashboardScreen.classList.remove("active");

    truthScreen.classList.add("active");

    showTruthIntro();

    window.scrollTo(0, 0);

    return;
}

        // Other feature popups
        const feature = features[featureName];

        modalTitle.textContent = feature.title;

        modalDescription.textContent = feature.description;

        featureModal.classList.add("active");

    });

});



// Close popup

function closeModal() {

    featureModal.classList.remove("active");

}


modalClose.addEventListener("click", closeModal);

modalOkay.addEventListener("click", closeModal);


// Close popup by clicking outside

featureModal.addEventListener("click", (event) => {

    if (event.target === featureModal) {

        closeModal();

    }

});


// Close popup with Escape key

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});

// =====================================
// YES OR NO GAME LOGIC
// =====================================


// 1. Select Game Elements

const yesNoScreen = document.getElementById("yesNoScreen");

const gameBack = document.getElementById("gameBack");

const gameIntro = document.getElementById("gameIntro");

const startGame = document.getElementById("startGame");

const questionArea = document.getElementById("questionArea");

const questionText = document.getElementById("questionText");

const questionNumber = document.getElementById("questionNumber");

const progressPercent = document.getElementById("progressPercent");

const progressFill = document.getElementById("progressFill");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");

const answerFeedback = document.getElementById("answerFeedback");

const nextQuestion = document.getElementById("nextQuestion");

const gameResult = document.getElementById("gameResult");

const resultMessage = document.getElementById("resultMessage");

const playAgain = document.getElementById("playAgain");

const resultBack = document.getElementById("resultBack");


// 2. Questions

const questions = [

    {
        question: "Tumi ki surprise pochondo koro?",

        yes: "Aha! Tahole tomar jonno surprise ready rakhte hobe! ❤️",

        no: "Achha! Tahole surprise er bodole coffee treat debo! 😂"
    },

    {
        question: "Amar sathe late-night adda dite bhalo lagbe?",

        yes: "Tahole ek cup coffee ar endless adda! ☕",

        no: "Oho! Eto taratari goodbye? 😂"
    },

    {
        question: "Tumi ki secretly romantic?",

        yes: "I knew it! Tomar moddhe romantic side ache! 😉",

        no: "Achha, tahole eta tomar secret thakuk! 😂"
    },

    {
        question: "Achha amar sathe akta room aka thakte bhoy lagbe?",

        yes: "Tumi kintu jano amar intention 🫦",

        no: "No pressure! Tomar comfort first. 😊"
    },

    {
        question: "Rainy day te jodi amra aksathe asi r oisob kori he he?",

        yes: "Achha ami aka na tahole",

        no: "Tahole rainy day te tomar jonno onno plan lagbe! 😂"
    },

    {
        question: "jodi ami relation na thaki kintu tomar sathei thaki acecpt korbe naki commitment chara amara kichui korte parbona?",

        yes: "okay nice choice",

        no: "i respect your decission"
    },

    {
        question: "Tumi ki cute little surprises bhalobasho?",

        yes: "Tahole ei website er kichu surprises tomar jonno! ♥",

        no: "Challenge accepted! Tomake hashanor plan korte hobe! 😉"
    },

    {
        question: "Aro ekta game khelte chaibe?",

        yes: "Yay! Tahole ekhanei shesh noy! ❤️",

        no: "Achha, ajker moto tomake chere dilam! 😂"
    }

];


// 3. Game Variables

let currentQuestion = 0;

let answered = false;

let yesCount = 0;

let noCount = 0;


// 4. Show Game Intro

function showGameIntro() {

    gameIntro.style.display = "flex";

    questionArea.classList.remove("active");

    gameResult.classList.remove("active");

    resetGame();

}


// 5. Start Game

startGame.addEventListener("click", () => {

    gameIntro.style.display = "none";

    questionArea.classList.add("active");

    loadQuestion();

});


// 6. Load Question

function loadQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionText.textContent = current.question;

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

    const progress = (currentQuestion / questions.length) * 100;

    progressFill.style.width = progress + "%";

    progressPercent.textContent = Math.round(progress) + "%";

    answerFeedback.textContent = "";

    nextQuestion.classList.remove("active");

    yesButton.disabled = false;

    noButton.disabled = false;

    yesButton.style.opacity = "1";

    noButton.style.opacity = "1";

    nextQuestion.textContent =
        currentQuestion === questions.length - 1
        ? "SEE MY RESULT ♥"
        : "NEXT QUESTION →";

}


// 7. Answer Function

function selectAnswer(answer) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    yesButton.disabled = true;

    noButton.disabled = true;

    if (answer === "yes") {

        yesCount++;

        answerFeedback.textContent = current.yes;

        yesButton.style.opacity = "1";

        noButton.style.opacity = "0.5";

    } else {

        noCount++;

        answerFeedback.textContent = current.no;

        noButton.style.opacity = "1";

        yesButton.style.opacity = "0.5";

    }

    nextQuestion.classList.add("active");

}


// 8. YES Button

yesButton.addEventListener("click", () => {

    selectAnswer("yes");

});


// 9. NO Button

noButton.addEventListener("click", () => {

    selectAnswer("no");

});


// 10. Next Question

nextQuestion.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});


// 11. Show Final Result

function showResult() {

    questionArea.classList.remove("active");

    gameResult.classList.add("active");

    progressFill.style.width = "100%";

    progressPercent.textContent = "100%";

    resultMessage.textContent =
        `Tumi ${yesCount} ta YES ar ${noCount} ta NO bolecho! 
        Thank you for playing, Madam Ji. ❤️`;

}


// 12. Reset Game

function resetGame() {

    currentQuestion = 0;

    yesCount = 0;

    noCount = 0;

    answered = false;

    progressFill.style.width = "0%";

    progressPercent.textContent = "0%";

}


// 13. Play Again

playAgain.addEventListener("click", () => {

    resetGame();

    gameResult.classList.remove("active");

    gameIntro.style.display = "none";

    questionArea.classList.add("active");

    loadQuestion();

});


// 14. Return to Dashboard

function returnToDashboard() {

    yesNoScreen.classList.remove("active");

    dashboardScreen.classList.add("active");

    window.scrollTo(0, 0);

}


gameBack.addEventListener("click", returnToDashboard);

resultBack.addEventListener("click", returnToDashboard);

const challengeMode = document.getElementById("challengeMode");

const challengeCount = document.getElementById("challengeCount");

const challengeText = document.getElementById("challengeText");

const challengeSubtitle = document.getElementById("challengeSubtitle");

const challengeIcon = document.getElementById("challengeIcon");

const skipChallenge = document.getElementById("skipChallenge");

const nextChallenge = document.getElementById("nextChallenge");

const truthFinalMessage = document.getElementById("truthFinalMessage");

const truthPlayAgain = document.getElementById("truthPlayAgain");

const truthDashboard = document.getElementById("truthDashboard");


// 2. Truth Questions

const truthQuestions = [

    "Tumi ki kokhono karo upor secretly crush kheyecho?",

    "Tomar perfect date kemon hobe?",

    "Tumi ki first message korte comfortable?",

    "Tomar moddhe kon quality ta tomar favourite?",

    "Kauke miss korle tumi ki take bolo?",

    "Tumi ki romantic movies pochondo koro?",

    "Tomar biggest dream ki?",

    "Kono cute compliment pele tomar kemon lage?",

    "Tumi ki late-night conversation pochondo koro?",

    "Tomar happiest memory konta?",

    "Tumi ki easily trust korte paro?",

    "Tomar ideal weekend kemon hobe?"

];


// 3. Dare Challenges

const dareChallenges = [

    "Amake ekta cute nickname dao! 😉",

    "Tomar favourite romantic gaaner naam bolo.",

    "Ekta cute emoji diye tomar mood describe koro.",

    "Amake ekta funny compliment dao! 😂",

    "Tomar favourite movie dialogue bolo.",

    "Ekta funny selfie pathate paro, only if you want! 📸",

    "Ekta gaaner 10 second hum kore shonao! 🎵",

    "Amake ekta sweet good morning message likhe dao.",

    "Tomar favourite food er naam bolo.",

    "Ekta funny joke bolo. Let's see if I laugh!",

    "Tomar dream travel destination bolo.",

    "Nijer jonno ekta cute compliment bolo! ❤️"

];


// 4. Game Variables

let selectedMode = "";

let currentChallenge = 0;

let availableChallenges = [];

const totalChallenges = 8;


// 5. Shuffle Function

function shuffleChallenges(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled;

}


// 6. Show Intro

function showTruthIntro() {

    truthIntro.style.display = "flex";

    challengeArea.classList.remove("active");

    truthComplete.classList.remove("active");

    currentChallenge = 0;

    selectedMode = "";

}


// 7. Select Truth or Dare

const modeButtons = document.querySelectorAll(".choice-button");

modeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectedMode = button.dataset.mode;

        const sourceQuestions =
            selectedMode === "truth"
                ? truthQuestions
                : dareChallenges;

        availableChallenges =
            shuffleChallenges(sourceQuestions).slice(0, totalChallenges);

        currentChallenge = 0;

        truthIntro.style.display = "none";

        challengeArea.classList.add("active");

        loadChallenge();

    });

});


// 8. Load Challenge

function loadChallenge() {

    if (currentChallenge >= totalChallenges) {

        finishTruthGame();

        return;

    }

    const challenge = availableChallenges[currentChallenge];

    challengeMode.textContent =
        selectedMode === "truth" ? "TRUTH TIME ♡" : "DARE TIME ✦";

    challengeCount.textContent =
        `CHALLENGE ${String(currentChallenge + 1).padStart(2, "0")} / ${totalChallenges}`;

    challengeIcon.textContent =
        selectedMode === "truth" ? "♡" : "✦";

    challengeText.textContent = challenge;

    challengeSubtitle.textContent =
        selectedMode === "truth"
            ? "Take your time. Be honest! ❤️"
            : "Ready? Let's see! 😉";

    nextChallenge.textContent =
        currentChallenge === totalChallenges - 1
            ? "FINISH GAME ♥"
            : "NEXT CHALLENGE →";

}


// 9. Next Challenge

function moveToNextChallenge() {

    currentChallenge++;

    loadChallenge();

}


// 10. Next Button

nextChallenge.addEventListener("click", moveToNextChallenge);


// 11. Skip Button

skipChallenge.addEventListener("click", moveToNextChallenge);


// 12. Finish Game

function finishTruthGame() {

    challengeArea.classList.remove("active");

    truthComplete.classList.add("active");

    truthFinalMessage.textContent =
        `You completed ${totalChallenges} ${selectedMode === "truth" ? "Truth questions" : "Dare challenges"}! 
        Besh bhalo khelecho, Madam Ji! ❤️`;

}


// 13. Play Again

truthPlayAgain.addEventListener("click", () => {

    showTruthIntro();

});


// 14. Back to Dashboard

function exitTruthGame() {

    truthScreen.classList.remove("active");

    dashboardScreen.classList.add("active");

    window.scrollTo(0, 0);

}


truthBack.addEventListener("click", exitTruthGame);

truthDashboard.addEventListener("click", exitTruthGame);
// ==============================
// PHASE 5 - LOVE LETTERS
// ==============================

const lettersScreen = document.getElementById("lettersScreen");
const lettersBack = document.getElementById("lettersBack");

const letterEnvelope = document.getElementById("letterEnvelope");
const letterEnvelopeArea = document.getElementById("letterEnvelopeArea");

const openLetter = document.getElementById("openLetter");
const letterContent = document.getElementById("letterContent");

const letterNumber = document.getElementById("letterNumber");
const letterTitle = document.getElementById("letterTitle");
const letterMessage = document.getElementById("letterMessage");

const nextLetter = document.getElementById("nextLetter");
const closeLetter = document.getElementById("closeLetter");


// Three personal letters
const loveLetters = [

    {
        title: "A Little Reminder ♥",

        message: `Hey Madam Ji,

Just a little reminder that you are special in your own way.

You don't need to be perfect, you don't need to impress everyone, and you don't need to change yourself for anybody.

Just be yourself, smile a little more, and keep shining.

And haan, tomar smile ta maintain koro! ♥`
    },

    {
        title: "Whenever You Feel Low",

        message: `Hey you,

If someday things don't go as planned, please don't be too hard on yourself.

Bad days are just bad days. They don't define who you are.

Take a deep breath, give yourself some time, and remember that you deserve happiness too.

Ekta kharap din mane kharap life noy. So keep going! ♥`
    },

    {
        title: "Just Because...",

        message: `Well, I don't really need a special reason to write this.

I just wanted to remind you that talking to you can make an ordinary day feel a little more interesting.

Stay happy, stay silly, and never lose that little spark of yours.

And yes, don't forget to smile after reading this! ♥`
    }

];

let currentLetter = 0;


// Display selected letter
function showLetter() {

    const letter = loveLetters[currentLetter];

    letterNumber.textContent =
        `LETTER ${currentLetter + 1} OF ${loveLetters.length}`;

    letterTitle.textContent = letter.title;

    letterMessage.textContent = letter.message;

    if (currentLetter === loveLetters.length - 1) {
        nextLetter.textContent = "BACK TO ENVELOPE ♥";
    } else {
        nextLetter.textContent = "NEXT LETTER →";
    }

}


// Reset letters screen
function resetLetters() {

    currentLetter = 0;

    letterEnvelope.classList.remove("open");

    letterEnvelopeArea.style.display = "block";

    letterContent.classList.remove("active");

    showLetter();

}


// Open letter
function openLoveLetter() {

    letterEnvelope.classList.add("open");

    letterEnvelopeArea.style.display = "none";

    letterContent.classList.add("active");

    showLetter();

}


// Open using envelope
letterEnvelope.addEventListener("click", openLoveLetter);


// Open using button
openLetter.addEventListener("click", openLoveLetter);


// Next letter
nextLetter.addEventListener("click", () => {

    if (currentLetter < loveLetters.length - 1) {

        currentLetter++;

        showLetter();

    } else {

        resetLetters();

    }

});


// Close current letter
closeLetter.addEventListener("click", resetLetters);


// Back to dashboard
lettersBack.addEventListener("click", () => {

    lettersScreen.classList.remove("active");

    dashboardScreen.classList.add("active");

    resetLetters();

    window.scrollTo(0, 0);

});
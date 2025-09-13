const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".menu-lives h2"),
        highScoreDisplay: document.querySelector("#high-score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        highScore: 0,
        gameActive: true
    },
    actions: {
        timerId: null,
        countDownTimerId: null
    }
};

function updateLivesDisplay() {
    state.view.lives.textContent = `x${state.values.lives}`;
}

function updateHighScoreDisplay() {
    state.view.highScoreDisplay.textContent = `Melhor: ${state.values.highScore}`;
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach(square => square.classList.remove("enemy"));

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

function countDown() {
    if (!state.values.gameActive) return;

    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function gameOver() {
    state.values.gameActive = false; // bloqueia cliques futuros
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    // Atualiza melhor pontuação
    if (state.values.result > state.values.highScore) {
        state.values.highScore = state.values.result;
        updateHighScoreDisplay();
        alert(`Game Over! Novo recorde: ${state.values.result}`);
    } else {
        alert(`Game Over! Seu resultado: ${state.values.result}`);
    }

    const restart = confirm("Quer jogar novamente?");
    if (restart) {
        resetGame();
    }
}

function resetGame() {
    state.values.result = 0;
    state.values.currentTime = 60;
    state.values.lives = 3;
    state.values.hitPosition = 0;
    state.values.gameActive = true;

    state.view.score.textContent = 0;
    state.view.timeLeft.textContent = state.values.currentTime;
    updateLivesDisplay();

    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (!state.values.gameActive) return; // bloqueia cliques quando acabou

            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.lives--;
                updateLivesDisplay();
                if (state.values.lives <= 0) {
                    gameOver();
                }
            }
        });
    });
}

function initialize() {
    addListenerHitbox();
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    updateLivesDisplay();
    updateHighScoreDisplay();
}

initialize();

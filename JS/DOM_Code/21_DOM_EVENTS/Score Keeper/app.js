const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('select');

let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;

const p1 = {
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    score: 0
}
const p2 = {
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    score: 0
}

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score++;
        if (player.score >= winningScore) {
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            isGameOver = true;
        }
        player.display.textContent = player.score;
    }
}

function reset() {
    isGameOver = false;
    winningScore = parseInt(winningScoreSelect.value);
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

p1.button.addEventListener('click', function () {
    updateScore(p1, p2)
})

p2.button.addEventListener('click', function () {
    updateScore(p2, p1)
})

resetButton.addEventListener('click', reset)

winningScoreSelect.addEventListener('change', reset)





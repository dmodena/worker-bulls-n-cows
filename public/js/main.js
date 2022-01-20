(function() {
    const worker = new Worker('js/worker.js');
    const guessInput = document.getElementById('guessInput');
    const startGameBtn = document.getElementById('startGameBtn');
    const guessBtn = document.getElementById('guessBtn');
    const giveUpBtn = document.getElementById('giveUpBtn');
    const resultInput = document.getElementById('resultInput');
    const resultTextArea = document.getElementById('resultTextArea');

    let guesses = 0;

    const startGame = function() {
        worker.postMessage({ fn: 'startGame' });
    }

    const guessNumber = function() {
        const guessedNumber = guessInput.value;
        const data = { fn: 'guess', val: [guessedNumber] };
        worker.postMessage(data);
    }

    const giveUp = function() {
        worker.postMessage({ fn: 'giveUp' });
    }

    worker.onmessage = function(message) {
        switch (message.data.fn) {
            case 'startGame':
                resultInput.value = message.data.val;
                break;
            case 'giveUp':
                resultInput.value = message.data.val;
                break;
            case 'guess':
                resultTextArea.value += `${++guesses}. ${message.data.val}\n`
            default:
                break;
        }
    }

    startGameBtn.addEventListener('click', startGame);
    guessBtn.addEventListener('click', guessNumber);
    giveUpBtn.addEventListener('click', giveUp);
})();

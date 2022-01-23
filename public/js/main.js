(function() {
    const worker = new Worker('js/worker.js');
    const guessInput = document.getElementById('guessInput');
    const startGameBtn = document.getElementById('startGameBtn');
    const guessBtn = document.getElementById('guessBtn');
    const giveUpBtn = document.getElementById('giveUpBtn');
    const statusInput = document.getElementById('statusInput');
    const resultTextArea = document.getElementById('resultTextArea');

    let guesses = 0;

    const getDigits = function(number) {
        if (isNaN(number))
            return [];

        return number.toString().split('').map(s => parseInt(s));
    }

    const startGame = function() {
        worker.postMessage({ fn: 'startGame' });
    }

    const guessNumber = function() {
        const guessedNumber = getDigits(guessInput.value);

        worker.postMessage({ fn: 'guess', val: guessedNumber });
    }

    const giveUp = function() {
        worker.postMessage({ fn: 'giveUp' });
    }

    const receiveFromWorker = function(message) {
        switch (message.data.fn) {
            case 'startGame':
                statusInput.value = message.data.val;
                break;
            case 'giveUp':
                statusInput.value = message.data.val;
                break;
            case 'guess':
                resultTextArea.value += `${++guesses}. ${message.data.val}\n`
            default:
                break;
        }
    }

    worker.onmessage = receiveFromWorker;
    startGameBtn.addEventListener('click', startGame);
    guessBtn.addEventListener('click', guessNumber);
    giveUpBtn.addEventListener('click', giveUp);
})();

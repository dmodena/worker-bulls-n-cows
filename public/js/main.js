(function() {
    const worker = new Worker('js/worker.js');
    const guessInputView = document.getElementsByClassName('guess-input-view');
    const guessInput = document.getElementById('guessInput');
    const startGameBtn = document.getElementById('startGameBtn');
    const numBtn0 = document.getElementById('numBtn0');
    const numBtn1 = document.getElementById('numBtn1');
    const numBtn2 = document.getElementById('numBtn2');
    const numBtn3 = document.getElementById('numBtn3');
    const numBtn4 = document.getElementById('numBtn4');
    const numBtn5 = document.getElementById('numBtn5');
    const numBtn6 = document.getElementById('numBtn6');
    const numBtn7 = document.getElementById('numBtn7');
    const numBtn8 = document.getElementById('numBtn8');
    const numBtn9 = document.getElementById('numBtn9');
    const backspaceBtn = document.getElementById('backspaceBtn');
    const guessBtn = document.getElementById('guessBtn');
    const giveUpBtn = document.getElementById('giveUpBtn');
    const statusInput = document.getElementById('statusInput');
    const historyList = document.getElementById('historyList');

    let guesses = 0;
    let lastGuess = [];

    const getDigits = function(number) {
        if (isNaN(number))
            return [];

        return number.toString().split('').map(s => parseInt(s));
    }

    const createHistoryItem = function(guessResult) {
        let guessAttempt = guesses < 10
            ? "0" + guesses.toString()
            : guesses.toString();

        return `<li class="list-group-item">${guessAttempt}. ${lastGuess} - ${guessResult}</li>`;
    }

    const updateInputView = function() {
        let guessInputStrList = guessInput.value.toString().split('');

        for (i = 0; i < 4; i++) {
            guessInputView[i].value = guessInputStrList[i] ?? '';
        }
    }

    const typeNumber = function(number) {
        let guessInputLength = guessInput.value?.toString().length ?? 0;

        if (guessInputLength > 3)
            return;

        guessInput.value += number.toString();
        updateInputView();
    }

    const typeBackspace = function() {
        let guessInputLength = guessInput.value?.toString().length ?? 0;

        if (guessInputLength == 0)
            return;

        guessInput.value = guessInput.value.slice(0, -1);
        updateInputView();
    }

    const startGame = function() {
        worker.postMessage({ fn: 'startGame' });
    }

    const guessNumber = function() {
        const guessedNumber = getDigits(guessInput.value);
        lastGuess = guessedNumber;

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
                historyList.value = createHistoryItem(message.data.val) + historyList.value;
            default:
                break;
        }
    }

    worker.onmessage = receiveFromWorker;
    startGameBtn.addEventListener('click', startGame);
    numBtn0.addEventListener('click', () => typeNumber(0));
    numBtn1.addEventListener('click', () => typeNumber(1));
    numBtn2.addEventListener('click', () => typeNumber(2));
    numBtn3.addEventListener('click', () => typeNumber(3));
    numBtn4.addEventListener('click', () => typeNumber(4));
    numBtn5.addEventListener('click', () => typeNumber(5));
    numBtn6.addEventListener('click', () => typeNumber(6));
    numBtn7.addEventListener('click', () => typeNumber(7));
    numBtn8.addEventListener('click', () => typeNumber(8));
    numBtn9.addEventListener('click', () => typeNumber(9));
    backspaceBtn.addEventListener('click', typeBackspace);
    guessBtn.addEventListener('click', guessNumber);
    giveUpBtn.addEventListener('click', giveUp);
})();

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

    const bullIcon = `<i class="bi bi-plus-circle"></i> `
    const cowIcon = `<i class="bi bi-dash-circle"></i> `
    const noneIcon = `<i class="bi bi-dash-lg"></i> `
    let guesses = 0;
    let lastGuess = [];

    const getDigits = function(number) {
        if (isNaN(number))
            return [];

        return number.toString().split('').map(s => parseInt(s));
    }

    const updateStatus = function(message) {
        statusInput.value = message;
    }

    const updateHistory = function(guessResult) {
        let oldHistory = historyList.innerHTML;
        let guessAttempt = guesses < 10
            ? "0" + guesses.toString()
            : guesses.toString();

        let result = `<li class="list-group-item">${guessAttempt}. ${lastGuess.join('')}: `;
        let bullsCount = 0;

        if (guessResult.length == 0) {
            result += noneIcon;
        }
        else {
            guessResult.filter(n => n == 1).forEach(n => result += bullIcon);
            guessResult.filter(n => n == 0).forEach(n => result += cowIcon);
            result += "</li>";
        }

        if (guessResult.filter(n => n == 1).length == 4)
            updateStatus(`You won! The secret number was: ${lastGuess.join('')}`);

        historyList.innerHTML = result + oldHistory;
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
        historyList.innerHTML = '';
        guessInput.value = '';
        guesses = 0;
        updateInputView();

        worker.postMessage({ fn: 'startGame' });
    }

    const guessNumber = function() {
        const guessedNumber = getDigits(guessInput.value);
        guesses += 1;
        lastGuess = guessedNumber;

        updateStatus(`Last guess: ${guessedNumber.join('')}`);
        guessInput.value = '';
        updateInputView();

        worker.postMessage({ fn: 'guess', val: guessedNumber });
    }

    const giveUp = function() {
        worker.postMessage({ fn: 'giveUp' });
    }

    const receiveFromWorker = function(message) {
        switch (message.data.fn) {
            case 'startGame':
                updateStatus(message.data.val);
                break;
            case 'giveUp':
                updateStatus(message.data.val);
                break;
            case 'guess':
                updateHistory(message.data.val);
                break;
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

const secretNumber = ['3', '2', '7', '4'];

onmessage = function(message) {
    handleMessage(message)
}

handleMessage = function(message) {
    switch (message.data.fn) {
        case 'startGame':
            startGame();
            break;
        case 'guess':
            guess(message.data.val);
            break;
        case 'giveUp':
            giveUp();
            break;
        default:
            console.error('Worker: Function does not exist', message.data.fn);
            break;
    }
}

startGame = function() {
    postMessage({ fn: 'startGame', val: ['Game started!'] });
}

guess = function(guessedNumber) {
    digits = guessedNumber.toString().split('');
    result = [];

    digits.forEach((digit, idx) => {
        if (digit == secretNumber[idx]) {
            result.push(1);
        }
        else if (secretNumber.includes(digit)) {
            result.push(0);
        }
    });

    result.sort().reverse();

    postMessage({ fn: 'guess', val: result });
}

giveUp = function() {
    postMessage({ fn: 'giveUp', val: [`You've given up!`] });
}

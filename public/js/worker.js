importScripts('./game.js');

let game;

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
    game = new Game();

    postMessage({ fn: 'startGame', val: ['Game started!'] });
}

guess = function(guessedNumber) {
    let result = game.guess(guessedNumber);

    postMessage({ fn: 'guess', val: result });
}

giveUp = function() {
    let result = game.giveUp();

    postMessage({ fn: 'giveUp', val: [`Secret number was: ${result.join('')}`] });
}

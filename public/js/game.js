class Game {
    #secretNumber;

    constructor() {
        this.#secretNumber = this.#generateSecretNumber();
    }

    guess(guessedNumber) {
        return this.checkGuess(guessedNumber, this.#secretNumber);
    }

    checkGuess(guessedNumber, secretNumber) {
        if (guessedNumber.length != secretNumber.length)
            return [];

        let result = [];
        guessedNumber.forEach((n, i) => {
            if (n == secretNumber[i]) {
                result.push(1);
            }
            else if (secretNumber.includes(n)) {
                result.push(0);
            }
        });

        result.sort().reverse();
        return result;
    }

    giveUp() {
        return this.#secretNumber;
    }

    #generateSecretNumber() {
        let options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let numbers = [];

        for (let i = 0; i < 4; i++) {
            let sortedIndex = Math.floor(Math.random() * options.length);
            numbers.push(options.splice(sortedIndex, 1));
        }

        return numbers.flat();
    }
}

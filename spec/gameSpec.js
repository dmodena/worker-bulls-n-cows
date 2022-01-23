describe('game', () => {
    it('should return correct output when guessing number', () => {
        let game = new Game();
        let secretNumber = [1, 2, 3, 4];
        let guessNumber = (guess) => game.checkGuess(guess, secretNumber);

        expect(guessNumber([5, 6, 7, 8])).toEqual([]);
        expect(guessNumber([4, 5, 6, 7])).toEqual([0]);
        expect(guessNumber([8, 9, 0, 4])).toEqual([1]);
        expect(guessNumber([2, 1, 9, 4])).toEqual([1, 0, 0]);
        expect(guessNumber([1, 3, 2, 4])).toEqual([1, 1, 0, 0]);
        expect(guessNumber([1, 2, 3, 4])).toEqual([1, 1, 1, 1]);
    });

    it('should return secret number on giveUp', () => {
        let game = new Game();
        let secretNumber = game.giveUp();
        expect(secretNumber.length).toEqual(4);
    });
});

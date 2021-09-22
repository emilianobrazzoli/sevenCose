module.exports = {
    roll: function(numberDice) { 
		if(numberDice===0){
			return 'Molto spiritoso';
		}
        var totalDice = numberDice;
        var message = '';
		var diceRolled = [];
		var currentIndex = 0;
        // While there remain elements to shuffle...
        while (0 !== totalDice) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * numberDice);
            totalDice -= 1;

            // And swap it with the current element. 
			diceRolled[currentIndex] = randomIndex;
			currentIndex++;
        }

 
        return message;
    }
};
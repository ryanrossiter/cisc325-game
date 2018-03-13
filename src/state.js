const State = {
	coins: 0,
    inCombat: false,
    combatTurn: -1,

	reset: function() {
		this.coins = 0;
	}
}

export default State;
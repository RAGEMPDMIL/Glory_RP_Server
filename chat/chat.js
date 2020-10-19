mp.events.add("playerJoin", (player) => {
		player.color = [Random(0, 255), Random(0, 255), Random(0, 255)]; 
});
	
mp.events.add("playerChat" ,(player, message) => {
		mp.players.broadcast(`!{${player.color}}${player.name}!{${player.color}}(${player.id})!{#FFFFFF}: ${message}`);
});

function Random(min, max) {
	let number = Math.round(Math.random()*(max-min)+min);
	return number;
}
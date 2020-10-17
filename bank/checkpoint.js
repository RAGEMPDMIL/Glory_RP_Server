const db = require('../modules/db');
var inBank;
const bank = mp.checkpoints.new(4, new mp.Vector3(-1572.3861,-573.4212,107.5), 2, new mp.Vector3(), 2, 255, 0, 0, 255, false);
const player = mp.players.local;
bank.showFor(player);

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    if(checkpoint == bank)
    {
        player.outputChatBox(`!{#74FF33}וברוך שובך לבנק !{#ffffff}${player.name}!{#74FF33} שלום`);
        player.outputChatBox(`!{#74FF33}/withdraw , /balance , /deposit !{#ffffff}- פעולות לבנק`);
        player.inBank = 1;
        console.log(player.inBank);
    }
});

mp.events.add("playerExitCheckpoint", (player, checkpoint) => {
   
    if(checkpoint == bank)
    {
        player.outputChatBox(`!{#ffffff}${player.name}!{#74FF33} יצאת מתפריט הבנק, המשך משחק מהנה`);
        player.inBank = 0;
        console.log(player.inBank);
    }
});

/*mp.events.addCommand('balance', (player) => {

    if(player.inBank == 0) return player.outputChatBox("הינך צריך להיות בתוך תפריט הבנק בכדי לבצע פעולות חשבון");
    var bank;
    db.query('SELECT `bank` FROM `accounts` WHERE username = ?', [player.name], function(err, res, row){
        if(err) console.log(err);
        if(res.length){
                player.bank = playerData.bank;
            };
        });
        console.log(player.bank);
});*/
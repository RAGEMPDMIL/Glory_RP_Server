const db = require('../modules/db');
var inBank;
const players = mp.players.local;
const bankData = {
    "Bank" : {
        "x" : 247.1980,
        "y" : 222.5283,
        "z" : 105.2868
    }
}
const bankCheckpoints = [];
Object.keys(bankData).forEach((value) => {
    const checkpoint = mp.checkpoints.new(3, new mp.Vector3(bankData[value].x, bankData[value].y, bankData[value].z), 2, new mp.Vector3(), 2, 255, 0, 0, 255, false);
    bankCheckpoints.push(mp.checkpoints.new(3, new mp.Vector3(bankData[value].x, bankData[value].y, bankData[value].z), 2, new mp.Vector3(), 2, 255, 0, 0, 255, false))
    checkpoint.showFor(players);
})

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
    if(bankCheckpoints.includes(checkpoint))
    {
        player.outputChatBox(`!{#74FF33}וברוך שובך לבנק !{#ffffff}${player.name}!{#74FF33} שלום`);
        player.outputChatBox(`!{#74FF33}/withdraw , /balance , /deposit !{#ffffff}- פעולות לבנק`);
        player.inBank = 1;
        console.log(player.inBank);
        player.notify('Press <font color="#00D4FF">E</font> for bank actions');
    }
});

mp.events.add("playerExitCheckpoint", (player, checkpoint) => {
   
    if(checkpoint === bank)
    {
        player.outputChatBox(`!{#ffffff}${player.name}!{#74FF33} יצאת מתפריט הבנק, המשך משחק מהנה`);
        player.inBank = 0;
        console.log(player.inBank);
    }
});
mp.events.add("server:player:bankact", (player) => {

    if(player.inBank)
    {
        player.outputChatBox("you pressed e in bank checkpoint");
    }
});
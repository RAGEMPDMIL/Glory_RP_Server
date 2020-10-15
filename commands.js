mp.events.addCommand('cmds', (player) => {
     player.outputChatBox('!{#AA4EFB}Player Commands: ');
     player.outputChatBox('!{#DCDCDC}/sethealth(לשנות לעצמך חיים) !{#FFFFFF}/setarmour(לשנות לעצמך מגן) !{#DCDCDC}/setskin(לשנות לעצמך סקין)');
     player.outputChatBox('!{#DCDCDC}/setskin(לשנות לעצמך סקין) !{#FFFFFF}');
     player.outputChatBox('!{#DCDCDC}/kill(להתאבד) !{#FFFFFF}/weapon(להביא לעצמך נשק) !{#DCDCDC}/vehicle(לשגר לעצמך רכב)');
});
mp.events.addCommand('sethealth', (player,health) => {
    if(!health) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /sethealth [1-1000]');
    player.health = health;
    player.outputChatBox(`!{#ff0000}(HP: ${health})!{#ffffff}שינית את החיים שלך`);
});

mp.events.addCommand('setarmour', (player,armour) => {
    if(!armour) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /setarmour [1-1000]');
    player.armour = armour;
    player.outputChatBox(`!{#ff0000}(HP: ${armour})!{#ffffff}שינית את המגן שלך`);
});

mp.events.addCommand('setskin', (player, skin) => {
    if(!skin) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /setskin [model]');
    let model = player.model
    player.model = mp.joaat(skin);
    player.outputChatBox(`!{#ff0000}${model}!{#ffffff}: שינית את הסקין שלך`);

})
mp.events.addCommand('kill', (player) => {
    player.health = 0;
    player.outputChatBox(`!{#ff0000}: הרגת את עצמך`);
});

mp.events.addCommand('weapon', (player, fullText, weapon, ammo) => {
    if(!weapon) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /weapon [model]');
    let weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000)
    player.outputChatBox(`!{#ff0000}${weapon}(Bullets: ${ammo})!{#ffffff}: הבאת לעצמך נשק`);
})

mp.events.addCommand('vehicle', (player,vehicle) => {
    if(!vehicle) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /vehicle [model]');
    const playerPos = player.position
    let vehiclemodel = mp.joaat(vehicle);
    let random = Math.floor(Math.random() * 255) + 1;
    const veh = mp.vehicles.new(vehiclemodel, playerPos,
    {
        numberPlate: `${player.name}`,
        color: [[random, random, random],[random, random, random]]
    });
    player.putIntoVehicle(veh, 0);
    player.outputChatBox(`!{#ff0000}${vehicle}!{#ffffff}: הבאת לעצמך את הרכב`);
});

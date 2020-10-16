mp.events.addCommand('cmds', (player) => {
    player.outputChatBox('!{#61FA68}Player Commands: ');
    player.outputChatBox('!{#19561C}/sethealth , /setarmour /setskin /id');
    player.outputChatBox('!{#19561C}/kill /weapon /vehicle');
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
   player.outputChatBox(`!{#ff0000}${vehicle.name}!{#ffffff}: הבאת לעצמך את הרכב`);
});
mp.events.addCommand('id', (player) => {
   player.outputChatBox(`~r~Name:${player.name} ID:${player.id}`);
});
mp.events.addCommand('mod', (player, _, modType , modIndex) => {
   if(!player.vehicle) return player.outputChatBox("You need to be in a vehicle to use this command.");
   if(!modType) return player.outputChatBox("/mod [type]");
   if(!modIndex) return player.outputChatBox("/mod [type] [index]");
   player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
   player.outputChatBox(`Mod Type ${modType} with Mod Index ${modIndex} applied.`);
});
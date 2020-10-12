mp.events.addCommand('hp', (player) => {
    player.health = 50;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('setskin', (player, skin) => {
    if(!skin) return player.outputChatBox('SYNTAX: /setskin [model]');
    let model = player.model
    player.model = mp.joaat(skin);

})
mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('weapon', (player, fullText, weapon, ammo) => {
    if(!weapon) return player.outputChatBox('SYNTAX: /weapon [model]');
    let weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000)
})

mp.events.addCommand('vehicle', (player) => {

    const playerPos = player.position
    mp.vehicles.new(mp.joaat("turismor"), playerPos,
    {
        numberPlate: "ADMIN",
        color: [[0, 255, 0],[0, 255, 0]]
    });
});

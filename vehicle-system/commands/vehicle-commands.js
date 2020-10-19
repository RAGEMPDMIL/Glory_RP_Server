const vehicles = require('../data/vehicle-data.json').Vehicles;

mp.events.addCommand('vehicle', (player, vehicle) => {
    const selectedVehicle = vehicle.toLowerCase();
    if (!vehicle) {
        return player.outputChatBox('!{#ff0000}Error!{#ffffff} /vehicle [model]');
    }

    if(vehicles[selectedVehicle]) {
        const playerPos = player.position;
        const random = Math.floor(Math.random() * 255) + 1;
        const veh = mp.vehicles.new(vehicles[selectedVehicle].hash, playerPos, {
            numberPlate: `${player.name}`,
            color: [
                [random, random, random],
                [random, random, random]
            ]
        });
        player.putIntoVehicle(veh, 0);
        player.outputChatBox(`!{#ff0000}${vehicle}!{#ffffff}: הבאת לעצמך את הרכב`);
    } else {
        return player.outputChatBox('!{#ff0000}Error!{#ffffff} vehicle model not found');
    }
});

mp.events.addCommand('mod', (player, _, modType) => {
    if (!player.vehicle) return player.outputChatBox("!{#FF7D3C}You need to be in a vehicle to use this command.");
    if (!modType) return player.outputChatBox("!{#FF7D3C}/mod (Nitro|Horn|Engine|Breaks|Shield)");
    //if(!modIndex) return player.outputChatBox("/mod (Nitro|Horn|Engine|Breaks|Shield)");
    if (modType == 'nitro') {
        player.vehicle.setMod(parseInt(40), parseInt(2));
        player.outputChatBox(`!{#FF7D3C}Nitro added to your vehicle`);
    } else if (modType == 'horn') {
        let random = Math.floor(Math.random() * 33) + 1;
        player.vehicle.setMod(parseInt(14), parseInt(random));
        player.outputChatBox(`!{#FF7D3C}Random horn added to your vehicle`);
    } else if (modType == 'engine') {
        player.vehicle.setMod(parseInt(11), parseInt(3));
        player.outputChatBox(`!{#FF7D3C}Racing engine added to your vehicle`);
    } else if (modType == 'breaks') {
        player.vehicle.setMod(parseInt(13), parseInt(2));
        player.outputChatBox(`!{#FF7D3C}Racing breaks added to your vehicle`);
    } else if (modType == 'shield') {
        player.vehicle.setMod(parseInt(16), parseInt(4));
        player.outputChatBox(`!{#FF7D3C}Shields added to your vehicle`);
    }
});
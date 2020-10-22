const vehicles = require('../data/vehicle-data.json').Vehicles;
const adminLevel = require('../../admin-system/commands');
const projectFunctions = require('../../utils/functions-utils');

mp.events.addCommand('vcolor', async (player, fullText, r1, g1, b1, r2, g2, b2) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    }
    player.spawnedVehicle.setColorRGB(Number(r1), Number(g1), Number(b2), Number(r2), Number(g2), Number(b2));
    player.notify("~g~vehicle color changed");
});

mp.events.addCommand('vcall', async (player) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    }
    player.spawnedVehicle.position = player.position;
    player.putIntoVehicle(player.spawnedVehicle, 0);
    player.notify("~g~you called your car !");
});

mp.events.addCommand('vehicle', async (player, vehicle) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    } else {
        if (player.vehicle) {
            return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו כאשר אתה ברכב');
        }
        if (player.spawnedVehicle && mp.vehicles.toArray().length > 0) {
            console.log(mp.vehicles.toArray()[player.spawnedVehicle]);
            mp.vehicles.toArray()[player.spawnedVehicle].destroy();
        }
        const selectedVehicle = vehicle.toLowerCase();
        if (vehicles[selectedVehicle]) {
            const playerPos = player.position;
            const random = Math.floor(Math.random() * 255) + 1;
            player.spawnedVehicle = mp.vehicles.new(vehicles[selectedVehicle].hash, playerPos, {
                numberPlate: `${player.name}`,
                color: [
                    [random, random, random],
                    [random, random, random]
                ]
            });
            player.putIntoVehicle(player.spawnedVehicle, 0);
            player.notify(`~g~you created ${vehicle} !`);
        } else {
            return projectFunctions.showErrorChat(player, 'שם הרכב שהזנת אינו קיים במערכת');
        }
    }
});

mp.events.addCommand('vmod', async (player, _, modType) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    }
    if (!player.vehicle) {
        return projectFunctions.showErrorChat(player, 'הינך יכול להשתמש בפקודה זו כאשר אתה ברכב');
    }
    if (!modType) {
        return projectFunctions.showErrorChat(player, '/vmod nitro,horn,engine,breaks,shields,all');
    }
    if (modType == 'nitro') {

        player.vehicle.setMod(parseInt(40), parseInt(2));
        player.notify("~g~Nitro added to your vehicle !");

    } else if (modType == 'horn') {

        let random = Math.floor(Math.random() * 33) + 1;
        player.vehicle.setMod(parseInt(14), parseInt(random));
        player.notify("~g~Random horn added to your vehicle !");

    } else if (modType == 'engine') {

        player.vehicle.setMod(parseInt(11), parseInt(3));
        player.notify("~g~Racing engine added to your vehicle !");

    } else if (modType == 'breaks') {

        player.vehicle.setMod(parseInt(13), parseInt(2));
        player.notify("~g~Racing breaks added to your vehicle !");

    } else if (modType == 'shield') {

        player.vehicle.setMod(parseInt(16), parseInt(4));
        player.notify("~g~Shields added to your vehicle !");

    } else if (modType == 'all') {

        player.vehicle.setMod(parseInt(40), parseInt(2));
        let random = Math.floor(Math.random() * 33) + 1;
        player.vehicle.setMod(parseInt(14), parseInt(random));
        player.vehicle.setMod(parseInt(16), parseInt(4));
        player.vehicle.setMod(parseInt(13), parseInt(2));
        player.vehicle.setMod(parseInt(11), parseInt(3));
        player.notify("~g~you added all the mods !");

    } else {
        projectFunctions.showErrorChat(player, '/vmod nitro,horn,engine,breaks,shields,all');
    }
});
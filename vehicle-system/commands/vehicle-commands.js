// - - - - - - - - Requires - - - - - - - - //

const db = require('../../modules/db');

const vehicles = require('../data/vehicle-data.json').Vehicles;
const adminLevel = require('../../admin-system/commands');

const projectFunctions = require('../../utils/functions-utils');
const moneySystemFunctions = require('../../bank-money-system/utils/bank-money-system-utils');

// - - - - - - - - Admin Vehicle Commands - - - - - - - - //

mp.events.addCommand('buyvehicle', async(player,fullText,vehname) => {

    if(!vehname) {
        return projectFunctions.showErrorChat(player, 'You must specify a vehicle to buy');
    }

    const selectedVehicle = vehname.toLowerCase();
    if (!vehicles[selectedVehicle]) {
        return projectFunctions.showErrorChat(player, 'This vehicle doe\'nt not exist');
    }
    let vehPrice = vehicles[selectedVehicle].price;
    console.log(player.bank);
    console.log(vehPrice);
    if(player.bank < vehPrice){
        return projectFunctions.showErrorChat(player, `you need ${vehPrice} to buy ${vehname}`);
    }
    else
    {
        const result = await moneySystemFunctions.playerChangeBank(player, Number(vehPrice));
        player.bank = player.bank-vehPrice;
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);

        await createPlayerVehicle(player,vehname,vehicles[selectedVehicle].hash);
        console.log("vehicle created");
        console.log(player.vehhash);
        if (player.vehname && mp.vehicles.toArray().length > 0) {
            const destroyVehicle = mp.vehicles.toArray().find((v) => {
                return v === player.vehname;
            });
    
            destroyVehicle.destroy();
        }
        const playerPos = player.position;
        player.vehname = mp.vehicles.new(vehicles[selectedVehicle].hash, playerPos, {
            numberPlate: `${player.name}`,
            color: [
                [0, 0, 0],
                [0, 0, 0]
            ]
        });
        player.putIntoVehicle(player.vehname, 0);
        player.notify(`~g~you bought ${vehname} with!`);
    }

});
mp.events.addCommand('vcall', async (player,fullText,vehname) => {

    if(!vehname) return projectFunctions.showErrorChat(player,'/vcall [veh name]');
    const vehicleDetails = await getPVehicleDetails(player,vehname);
    if(!vehicleDetails[0]){
        return projectFunctions.showErrorChat(player,'אין רכב כזה בבעלותך');
    }

    player.vehhash = vehicleDetails[0];
    console.log(player.vehhash);
    const playerPos = player.position;
    if (player.vehname && mp.vehicles.toArray().length > 0) {
        const destroyVehicle = mp.vehicles.toArray().find((v) => {
            return v === player.vehname;
        });

        destroyVehicle.destroy();
    }
    player.vehname = mp.vehicles.new(player.vehhash, playerPos, {
        numberPlate: `${player.name}`,
        color: [
            [0, 0, 0],
            [0, 0, 0]
        ]
    });
    player.putIntoVehicle(player.vehname, 0);
    player.notify("~g~you called your car !");
});
// - - - - - - - - Admin Vehicle Commands - - - - - - - - //

mp.events.addCommand('xvcolor', async (player, fullText, r1, g1, b1, r2, g2, b2) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    }
    player.spawnedVehicle.setColorRGB(Number(r1), Number(g1), Number(b2), Number(r2), Number(g2), Number(b2));
    player.notify("~g~vehicle color changed");
});

mp.events.addCommand('xvcall', async (player) => {
    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'אינך יכול להשתמש בפקודה זו');
    }
    player.spawnedVehicle.position = player.position;
    player.putIntoVehicle(player.spawnedVehicle, 0);
    player.notify("~g~you called your car !");
});
mp.events.addCommand('xvehicle', async (player, vehicle) => {
    if(!vehicle) {
        return projectFunctions.showErrorChat(player, 'You must specify a vehicle to spawn');
    }

    const aLevel = await adminLevel.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player, 'Only admins can use this command');
    } else {
        if (player.vehicle) {
            return projectFunctions.showErrorChat(player, 'You can\'t call a vehcile while inside one');
        }

        const selectedVehicle = vehicle.toLowerCase();
        if (!vehicles[selectedVehicle]) {
            return projectFunctions.showErrorChat(player, 'This vehicle doe\'n not exist');
        }

        if (player.spawnedVehicle && mp.vehicles.toArray().length > 0) {
            const destroyVehicle = mp.vehicles.toArray().find((v) => {
                return v === player.spawnedVehicle;
            });

            destroyVehicle.destroy();
        }

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

    }
});

mp.events.addCommand('xvmod', async (player, _, modType) => {
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

async function createPlayerVehicle(player, vehicle, hash) {
    return new Promise(function (resolve) {
        try {         
                db.query('INSERT INTO `vehicles` SET owner = ?, vehicle = ?, hash = ?', [player.name, vehicle, hash], function (error, result, fields) {
                if (error) {console.log(error);}
                else {
                    resolve("success")
                    player.vehhash = hash;
                };
            });
        } 
        catch (e) 
        {console.log(e);}
    });
}
async function getPVehicleDetails(player,vehname) {
    return new Promise(function (resolve){
        try {
            db.query('SELECT `hash` FROM `vehicles` WHERE BINARY `owner` = ? AND `vehicle` = ?', [player.name,vehname], function(err, result, rows){
                if(err) {
                    console.log(err);
                }
                resolve([result[0].hash]);
            });
        } catch(e) {console.log(e);}
    });
};

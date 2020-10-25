const db = require('../../modules/db');
const vehiclesData = require('../data/vehicle-data.json').Vehicles;

module.exports.initVehicleSystem = async function initVehicleSystem() {
    await spawnDealership('low-end');
};

module.exports.getVehicleData = async function getVehicleData(vehicleName) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `price`, `amount` FROM `dealership` WHERE `name`=?', [vehicleName], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else if (result.length > 0) {
                    resolve([result[0].price, result[0].amount]);
                } else {
                    resolve(false);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
};

async function spawnDealership(type) {
    Object.keys(vehiclesData).forEach((value) => {
        if (vehiclesData[value].dealership.type === type) {
            mp.vehicles.new(vehiclesData[value].hash, new mp.Vector3(vehiclesData[value].dealership.x, vehiclesData[value].dealership.y, vehiclesData[value].dealership.z), {
                heading: parseFloat(vehiclesData[value].dealership.heading),
                numberPlate: "Exhibition",
                locked: true,
                engine: false,
                color: [
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            });
            mp.labels.new(`Vehicle Name: ${vehiclesData[value].name}\nPrice: ${'$' + String(vehiclesData[value].price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\nTotal Left: ${vehiclesData[value].amount < 0 ? 'Unlimited' : vehiclesData[value].amount}`, new mp.Vector3(vehiclesData[value].dealership.x, vehiclesData[value].dealership.y, vehiclesData[value].dealership.z), {
                los: false,
                font: 4,
                drawDistance: 20
            });
        }
    });
}
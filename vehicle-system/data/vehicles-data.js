const vehicleUtils = require('../util/vehicle-system-functions');
const vehicleData = require('./vehicle-data.json').Vehicles;


Object.keys(vehicleData).forEach(async (value) => {
    const vehicleInfo = await vehicleUtils.getVehicleData(value);
    vehicleData[value].price = vehicleInfo[0];
    vehicleData[value].amount = vehicleInfo[1];
});
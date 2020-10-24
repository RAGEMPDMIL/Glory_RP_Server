const showRoomVehicles = require('../vehicles.json');
let showroomVehicle;
const db = require('../../../modules/db');

Object.keys(showRoomVehicles).forEach(async(value) => {
    const vehicleData = await getVehicleData(value);
    showRoomVehicles[value].price = vehicleData[0];
    showRoomVehicles[value].amount = vehicleData[1];
    console.log(showRoomVehicles[value]);
    showroomVehicle = mp.vehicles.new(showRoomVehicles[value].hash,new mp.Vector3(showRoomVehicles[value].x, showRoomVehicles[value].y, showRoomVehicles[value].z), 
    {
        heading : parseFloat(showRoomVehicles[value].heading),
        numberPlate: "Exhibition",
        locked: true,
        engine: false,
        freezePosition: true ,
        color: [
            [0, 0, 0],
            [0, 0, 0]
        ]
    });
    mp.labels.new(`Vehicle Name: ${value}\nPrice: ${showRoomVehicles[value].price}\nTotal Left: ${showRoomVehicles[value].amount}`, new mp.Vector3(showRoomVehicles[value].x, showRoomVehicles[value].y, showRoomVehicles[value].z),
        {
            los: false,
            font: 4,
            drawDistance: 20
        });
});

async function getVehicleData(vehicleName)
{
    return new Promise(function(resolve){
        try{
            db.query('SELECT `price`, `amount` FROM `dealership` WHERE `name`=?',[vehicleName], function(err,result,fields){
                if(err) {
                    console.log(err);
                    resolve(false);
                } else if(result.length > 0){
                    resolve([result[0].price,result[0].amount]);
                }
                else{
                    resolve(false);
                }
            });
        }
        catch(e){console.log(e);}
    });
}
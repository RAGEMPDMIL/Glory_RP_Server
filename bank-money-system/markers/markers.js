const moneySystemMerkers = require('./markers-data.json');

Object.keys(moneySystemMerkers).forEach((value) => {
    mp.markers.new(moneySystemMerkers[value].markerType, new mp.Vector3(moneySystemMerkers[value].position.x, moneySystemMerkers[value].position.y, moneySystemMerkers[value].position.z), moneySystemMerkers[value].scale, {
        ...moneySystemMerkers[value].options
    });
});
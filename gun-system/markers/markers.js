const gunSystemMarkers = require('./markers-data.json');

Object.keys(gunSystemMarkers).forEach((value) => {
    mp.markers.new(gunSystemMarkers[value].markerType, new mp.Vector3(gunSystemMarkers[value].position.x, gunSystemMarkers[value].position.y, gunSystemMarkers[value].position.z), gunSystemMarkers[value].scale, {
        ...gunSystemMarkers[value].options,
    });
});
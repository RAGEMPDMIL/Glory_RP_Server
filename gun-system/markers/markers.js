const gunSystemMarkers = {
    Ammo: {
        markerType: 1,
        position: {
            x: 252.0848846435547,
            y: -49.68246078491211,
            z: 68.5410629272461,
        },
        scale: 1.0,
        options: {
            color: [30, 90, 200, 70],
            direction: 0,
            dimension: 0,
            rotation: 0,
            visible: true
        }
    }
};

Object.keys(gunSystemMarkers).forEach((value) => {
    mp.markers.new(gunSystemMarkers[value].markerType, new mp.Vector3(gunSystemMarkers[value].position.x, gunSystemMarkers[value].position.y, gunSystemMarkers[value].position.z), gunSystemMarkers[value].scale, {
        direction: gunSystemMarkers[value].options.direction,
        color: gunSystemMarkers[value].options.color,
        visible: gunSystemMarkers[value].options.visible,
        dimension: gunSystemMarkers[value].options.dimension,
        rotation: gunSystemMarkers[value].options.rotation
    });
});
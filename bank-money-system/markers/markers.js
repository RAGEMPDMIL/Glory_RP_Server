const moneySystemMerkers = {
    Bank: {
        markerType: 1,
        position: {
            x: 246.64202880859375,
            y: 221.6378631591797,
            z: 105.28675079345703
        },
        scale: 1.0,
        options: {
            color: [90, 220, 80, 70],
            direction: 0,
            dimension: 0,
            rotation: 0,
            visible: true
        }
    }
};

Object.keys(moneySystemMerkers).forEach((value) => {
    mp.markers.new(moneySystemMerkers[value].markerType, new mp.Vector3(moneySystemMerkers[value].position.x, moneySystemMerkers[value].position.y, moneySystemMerkers[value].position.z), moneySystemMerkers[value].scale, {
        direction: moneySystemMerkers[value].options.direction,
        color: moneySystemMerkers[value].options.color,
        visible: moneySystemMerkers[value].options.visible,
        dimension: moneySystemMerkers[value].options.dimension,
        rotation: moneySystemMerkers[value].options.rotation
    });
});
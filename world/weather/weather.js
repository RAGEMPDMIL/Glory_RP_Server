const weather = {
    ExtraSunny: 'EXTRASUNNY',
    Clear: 'CLEAR',
    Clouds: 'CLOUDS',
    Smog: 'SMOG',
    Foggy: 'FOGGY',
    Rain: 'RAIN',
    Thunder: 'THUNDER',
    Clearing: 'CLEARING',
    Netural: 'NEUTRAL',
    Snow: 'SNOW',
    Blizzard: 'BLIZZARD',
    Snowlight: 'SNOWLIGHT',
    // Xmas: 'XMAS',
    // Halloween: 'HALLOWEEN'
};

const weatherKeys = Object.keys(weather);
mp.world.setWeatherTransition(weather[weatherKeys[Math.floor(Math.random() * weatherKeys.length)]]);

setInterval(() => {
    const random = Math.floor(Math.random() * weatherKeys.length);
    mp.world.setWeatherTransition(weather[weatherKeys[random]], 600000);
}, 1200000);
//Time progression 
var hour = 0;
var min = 0;
var sec = 0;

setInterval(() => {
    var d = new Date();
    var h1 = d.getUTCHours();
    var m1 = d.getUTCMinutes();
    var s1 = d.getUTCSeconds();
    var ms = d.getUTCMilliseconds();

    hour = (Math.floor(m1/2) + h1 * 6) % 24;
    min =  (Math.floor(s1/2) + m1 * 30) % 60;
    sec =  (Math.floor(ms*0.03) + s1 * 30) % 60;

    mp.world.time.set(hour, min, sec);
}, 250);

// Time related commands
mp.events.addCommand('getTime', (player, fullText) => {
    let hour = mp.world.time.hour;
    let minute = mp.world.time.minute;
    let second = mp.world.time.second;

    if(hour < 10) {
        hour = '0' + String(hour);
    }

    if(minute < 10) {
        minute = '0' + String(minute);
    }

    if(second < 10) {
        second = '0' + String(second);
    }

    player.outputChatBox(`השעה עכשיו היא: ${hour}:${minute}`);
});

mp.events.addCommand('setTime', (player, fullText, hour, minute, second) => {
    if(hour > 23 || hour < 0 || minute > 59 || minute < 0 || second < 0 || second > 59) {
        // Print bad format
    } else {
        mp.world.time.hour = Number(hour);
        mp.world.time.minute = Number(minute);
        mp.world.time.second = Number(second);
        player.outputChatBox(`שינית את השעה`);
    }
});

mp.events.add('server:worldTime:getWorldTime', (player, eventLocation) => {
    switch (eventLocation) {
        case 'moneySystem': {
            player.call('client:moneyBankSystem:getWorldTime', [mp.world.time.hour, mp.world.time.minute]);
            break;
        }
    }
});
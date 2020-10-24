const weapons = require('../data/wepons.json');
const projectFunctions = require('../../utils/functions-utils');
const { buyHandgun } = require('../utils/gun-system-utils');

mp.events.addCommand('buyweapon', (player,fullText,guncat,gunname) => {
    console.log("wait");
    player.call(buyHandgun(player,gunname,guncat));
    console.log(gunname + " " + guncat);
    console.log(weapons[guncat].Weapons[gunname].hash);
    if(guncat!='Melee'&& guncat!='Throwables' &&guncat!='Misc')
    {
        player.giveWeapon(mp.joaat(weapons[guncat].Weapons[gunname].id), 1000);
    }
    else
    {
        switch (guncat){
            case 'Melee':
                player.giveWeapon(mp.joaat(weapons[guncat].Weapons[gunname].id), 1);
                break;
            case 'Throwables':
                player.giveWeapon(mp.joaat(weapons[guncat].Weapons[gunname].id), 5);
                break;
            case 'Misc':
                player.giveWeapon(mp.joaat(weapons[guncat].Weapons[gunname].id), 1);
                break;
        }
    }
})
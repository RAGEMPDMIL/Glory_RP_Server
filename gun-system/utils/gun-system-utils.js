const db = require('../../modules/db');
const weapons = require('../data/wepons.json');
const bank = require('../../bank-money-system/events/bank-money-system-events');
const moneySystemFunctions = require('../../bank-money-system/utils/bank-money-system-utils');


module.exports.buyHandgun = async function buyHandgun(player,weapon,guncat) {
        console.log("started");
        var ammo = guncat+'ammo';
        if(await payWithCash(player,weapons[guncat].Weapons[weapon].price))
        {
            console.log(weapons[guncat].Weapons[weapon].price);
            console.log("can buy it");
            if(await checkPlayerWeaponExistance(player))
            {
                if(guncat!='Melee'&& guncat!='Throwables' &&guncat!='Misc')
                {
                    await newWeaponForPlayerHandgun(player,weapon,guncat,ammo,100);
                }
                else
                {
                    switch (guncat){
                        case 'Melee':
                            await newWeaponForPlayerMelee(player,weapon,guncat);
                            break;
                        case 'Misc':
                            await newWeaponForPlayerMelee(player,weapon,guncat);
                            break;
                        case 'Throwables':
                            await newWeaponForPlayerHandgun(player,weapon,guncat,ammo,5);
                            break;

                    }
                }
                console.log("already in the table");
                
            }
            else
            {
                console.log("new player in table");
                await newWeaponNewPlayerHandgun(player,weapon,guncat);
            }
        }
};

async function checkPlayerMoney(player){
    return new Promise (function(resolve){
        try{
            db.query('SELECT `money` FROM `accounts` WHERE `username`=?',[player.name],function(err,res,fields){
                if(err) {
                    console.log(e);
                    resolve(-1);
                } 
                if(res[0].length!=0)
                {
                    resolve(res[0].money);
                }  
            })
        }catch(e){console.log(e);}
    })
}

async function payWithCash(player,price){
    var playerMoney = await checkPlayerMoney(player);
    if(playerMoney>=price){
        playerMoney=playerMoney-price;
        return new Promise(function(resolve) {
            try {
                db.query('UPDATE `accounts` SET `money` = ? WHERE `username` = ?', [playerMoney, player.name], (err, result, fields) => {
                    if(err) {
                        console.log(e);
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                    player.call('client:playerHud:setMoneyInfo', [player.bank, playerMoney]);
                })
            }catch(e){console.log(e);}
        })
    }
    
}

async function checkPlayerWeaponExistance(player){
    console.log("checkin player existance");
    return new Promise(function(resolve) {
        try{
            db.query('SELECT * FROM `wepons` WHERE `username`=?', [player.name], (err, result, fields) => {
                console.log(result.length)
                if(err) {
                    console.log(e);
                    resolve(false);
                }
                if(result.length!=0)
                {
                    resolve(true);
                }
                else
                {
                    resolve(false);
                }
            })
        }catch(e){console.log(e);}
    })
}

async function newWeaponNewPlayerHandgun(player,weapon,guncat){
    console.log("inserting");
    var id= await getPlayerID(player);
    console.log(id);
    return new Promise(function(resolve){
        try{
            db.query('INSERT INTO `wepons` SET `id`=?, `username`=?, ??=?', [id,player.name,guncat,weapons[guncat].Weapons[weapon].hash], (err, result, fields) => {
                if(err) {
                    console.log(e);
                    resolve(false);
                }  
                resolve(true);
            })
        }catch(e){console.log(e);}
    })
}

async function getPlayerID(player){
    return new Promise(function(resolve){
        try{
            db.query('SELECT `id` FROM `accounts` WHERE `username`=?',[player.name],(err,res,fields)=>{
                if(err) {
                    console.log(e);
                } 
                if(res.length!=0)
                {
                    resolve(res[0].id);
                }
            })
        }catch(e){console.log(e);}
    })
}

async function newWeaponForPlayerHandgun(player,weapon,guncat,ammocol,ammunition){
    return new Promise(function(resolve){
        try{
            db.query('UPDATE `wepons` SET ??=?, ??=? WHERE `username`=?', [guncat,weapons[guncat].Weapons[weapon].hash,ammocol,ammunition,player.name], (err, result, fields) => {
                if(err) {
                    console.log(e);
                    resolve(false);
                }  
                resolve(true);
            })
        }catch(e){console.log(e);}
    })
}


async function newWeaponForPlayerMelee(player,weapon,guncat){
    return new Promise(function(resolve){
        try{
            db.query('UPDATE `wepons` SET ??=? WHERE `username`=?', [guncat,weapons[guncat].Weapons[weapon].hash,player.name], (err, result, fields) => {
                if(err) {
                    console.log(e);
                    resolve(false);
                }  
                resolve(true);
            })
        }catch(e){console.log(e);}
    })
}

exports.insertIntoDb = function lala(tableName,insertObj) {
    connection.query('INSERT INTO ?? SET ?', [ tableName, insertObj ], )
  };
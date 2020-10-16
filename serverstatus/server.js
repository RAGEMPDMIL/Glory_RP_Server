const db = require('../modules/db');

mp.events.add("serverShutdown", async () =>{

    mp.events.delayShutdown = true;
    await setShutDown();
    mp.events.delayShutdown = false;
});

module.exports.setAllOffline = async function setAllOffline() {
    return new Promise(function(resolve) {
        try {
            db.query('UPDATE `accounts` SET `online`=0', function(error, result, fields) {
                if(error) {
                    console.log(error);
                }
                resolve(null);
                console.log('All the accounts set to offline status');
            });
        } catch(e) {console.log(e);}
    });
}
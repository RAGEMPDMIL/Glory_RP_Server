mp.events.delayInitialization = true; //  Setting this to true won't allow players to connect until this is false again

// Load up gamemode assets
require('./Modules/db');
require('./Authentication/authentication');
require('./events');
//require('./commands/playercmds/commands');
//require('./commands/admincmds/commands');
require('./Player/death/death');
<<<<<<< Updated upstream
require('./chat/chat');
// require('./commands/teleports/tele');
=======
require('./Chat/chat');
>>>>>>> Stashed changes

// Wait for everything to load, then allow connections once all is loaded
(async () => {
    mp.events.delayInitialization = false; //  Players cannot join until this is false
})();
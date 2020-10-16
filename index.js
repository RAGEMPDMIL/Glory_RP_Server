mp.events.delayInitialization = true; //  Setting this to true won't allow players to connect until this is false again

// Load up gamemode assets
require('./Modules/db');
require('./Authentication/authentication');
require('./events');
require('./Server Commands/Player Commands/player-commands');
require('./Server Commands/Admin Commands/admin-commands');
require('./Player/Death/player-death');
require('./Chat/chat');

// Wait for everything to load, then allow connections once all is loaded
(async () => {
    mp.events.delayInitialization = false; //  Players cannot join until this is false
})();
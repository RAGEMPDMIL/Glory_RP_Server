mp.events.delayInitialization = true; //  Setting this to true won't allow players to connect until this is false again

// Load up gamemode assets
require('./modules/db');
require('./authentication/authentication');
require('./player/quit/quit');
require('./events');
require('./server_commands/player_commands/player-commands');
require('./server_commands/admin_commands/admin-commands');
require('./player/death/player-death');
require('./chat/chat');

// Wait for everything to load, then allow connections once all is loaded
(async () => {
    mp.events.delayInitialization = false; //  Players cannot join until this is false
})();
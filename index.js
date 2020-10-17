mp.events.delayInitialization = true; //  Setting this to true won't allow players to connect until this is false again

// Load up gamemode assets
require('./modules/db');
require('./authentication/authentication');
require('./player/session/session');
require('./events');
require('./server-commands/player-commands/player-commands');
require('./server-commands/admin-commands/admin-commands');
require('./player/death/player-death');
require('./chat/chat');
require('./player/teleports/teleports');
require('./bank-money-system/checkpoint');

const server = require('./server_status/server');

// Wait for everything to load, then allow connections once all is loaded
(async () => {
    await server.setAllOffline();
    mp.events.delayInitialization = false; //  Players cannot join until this is false
})();
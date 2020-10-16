mp.events.add('playerQuit', function(player, exitType, reason){
    mp.events.call('server:auth:onPlayerLogout', player.name);
});
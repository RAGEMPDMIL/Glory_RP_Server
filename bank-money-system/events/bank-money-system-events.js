const moneySystemFunctions = require('../utils/bank-money-system-utils');
const projectFunctions = require('../../utils/functions-utils');

mp.events.add('server:moneyBankSystem:getPlayerMoney', async (player) => {
    const playerMoney = await moneySystemFunctions.getMoneyInfo(player.name);
    player.bank = Number(playerMoney[0]);
    player.wallet = Number(playerMoney[1]);
    player.call('client:moneyBankSystem:loadPlayer', [String(player.bank), String(player.wallet)]);
});

mp.events.add('server:moneyBankSystem:deposit', (player, cash) => {
    moneySystemFunctions.depositMoney(player, cash).catch((r) => {
        return player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet), 'Error 3305: Somthing went worng plaease try again']);
    });
    player.bank += Number(cash);
    player.wallet -= Number(cash);
    player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
    player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet)]);
});

mp.events.add('server:moneyBankSystem:withdraw', (player, cash) => {
    moneySystemFunctions.withdrawMoney(player, cash).catch((r) => {
        return player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet), 'Error 3305: Somthing went worng plaease try again']);
    });
    player.bank -= Number(cash);
    player.wallet += Number(cash);
    player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
    player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet)]);
});

mp.events.add('server:moneyBankSystem:transfer', async (player, username, cash) => {
    const userExists = await projectFunctions.isUserExists(username);
    if (!userExists) {
        return player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet), 'Error 3306: User does not exist']);
    }

    const destinationPlayer = mp.players.toArray().find((p) => {
        return p.name === username;
    });

    if(!destinationPlayer) {
        const offlinePlayerData = await moneySystemFunctions.getMoneyInfo(username);
        await moneySystemFunctions.transferMoneyOffline(player, username, Number(offlinePlayerData[0]), Number(cash));
        player.bank -= Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        return player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet)]);
    } else {
        await moneySystemFunctions.transferMoneyOnline(player, destinationPlayer, Number(cash));
        player.bank -= Number(cash);
        destinationPlayer.bank += Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        destinationPlayer.notify('You recived $' + cash + ' from ' + username);
        destinationPlayer.call('client:playerHud:setMoneyInfo', [destinationPlayer.bank, destinationPlayer.wallet]);
        if(destinationPlayer.inBank) {
            destinationPlayer.call('client:moneyBankSystem:loadPlayer', [destinationPlayer.bank, destinationPlayer.wallet]);
        }
        return player.call('client:moneyBankSystem:stopLoading', [String(player.bank), String(player.wallet)]);
    }
});


const moneySystemFunctions = require('../utils/bank-money-system-utils');

mp.events.add('server:moneyBankSystem:getPlayerMoney', async (player) => {
    const playerMoney = await moneySystemFunctions.getMoneyInfo(player.name);
    player.bank = Number(playerMoney[0]);
    player.wallet = Number(playerMoney[1]);
    player.call('client:moneyBankSystem:getPlayerMoney', playerMoney);
});


const moneySystemFunctions = require('../utils/bank-money-system-utils');
const projectFunctions = require('../../utils/functions-utils');

mp.events.addCommand('deposit', async (player, fullText, cash) => {
    if (!projectFunctions.isNumeric(cash)) {
        return projectFunctions.showErrorChat(player, 'Cash input is not a number!');
    }

    if (Number(cash) <= 0) {
        return projectFunctions.showErrorChat(player, 'Cash input is invalid!');
    }

    if (Number(cash) > player.wallet) {
        return projectFunctions.showErrorChat(player, 'You dont have enough cash on you!');
    }
    const result = await moneySystemFunctions.depositMoney(player, Number(cash));
    if (result) {
        player.bank += Number(cash);
        player.wallet -= Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        return player.outputChatBox('הפקדת לחשבון הבנק $' + cash.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
});

mp.events.addCommand('withdraw', async (player, fullText, cash) => {
    if (!projectFunctions.isNumeric(cash)) {
        return projectFunctions.showErrorChat(player, 'Cash input is not a number!');
    }

    if (Number(cash) <= 0) {
        return projectFunctions.showErrorChat(player, 'Cash input is invalid!');
    }

    if (Number(cash) > player.bank) {
        return projectFunctions.showErrorChat(player, 'You dont have enough cash in the bank!');
    }

    const result = await moneySystemFunctions.withdrawMoney(player, Number(cash));
    if (result) {
        player.bank -= Number(cash);
        player.wallet += Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        return player.outputChatBox('משכת $' + cash.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' מחשבון הבנק שלך');
    }
});

mp.events.addCommand('transfermoney', async (player, fullText, username, cash) => {
    if (!projectFunctions.isNumeric(cash)) {
        return projectFunctions.showErrorChat(player, 'Cash input is not a number!');
    }

    if (Number(cash) <= 0) {
        return projectFunctions.showErrorChat(player, 'Cash input is invalid!');
    }

    if (Number(cash) > player.bank) {
        return projectFunctions.showErrorChat(player, 'You can\'t transfer more money then you have in the bank!');
    }

    const userExists = await projectFunctions.isUserExists(username);
    if (!userExists) {
        return projectFunctions.showErrorChat(player, 'User doe\'s not exist');
    }

    const destinationPlayer = mp.players.toArray().find((player) => {
        return player.name === username;
    });

    if(!destinationPlayer) {
        const offlinePlayerData = await moneySystemFunctions.getMoneyInfo(username);
        await moneySystemFunctions.transferMoneyOffline(player, username, Number(offlinePlayerData[0]), Number(cash));
        projectFunctions.showServerMessage(player, `You transfered $${cash} to ${username}`);
        player.bank -= cash;
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
    } else {
        await moneySystemFunctions.transferMoneyOnline(player, destinationPlayer, Number(cash));
        projectFunctions.showServerMessage(player, `You transfered $${cash} to ${username}`);
        projectFunctions.showServerMessage(destinationPlayer, `You recived $${cash} from ${player.name}`);
        player.bank -= cash;
        destinationPlayer.bank += cash;
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        destinationPlayer.call('client:playerHud:setMoneyInfo', [destinationPlayer.bank, destinationPlayer.wallet]);
    }
});
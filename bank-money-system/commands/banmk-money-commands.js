
const functions = require('../utils/bank-money-system-utils');

mp.events.addCommand('deposit', async (player, fullText, cash) => {
    if(!isNumeric(cash)) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - הכסף שהוכנס אינו מספר]');
    }

    if(Number(cash) <= 0) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - המספר שהוכנס להפקיד אינו חוקי]');
    }

    if(Number(cash) > player.wallet) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - אתה לא יכול להפקיד יותר כסף ממה שיש לך בארנק]');
    }
    const result = await functions.depositMoney(player, Number(cash));
    if(result) {
        player.bank = player.bank + Number(cash);
        player.wallet = player.wallet - Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        return player.outputChatBox('הפקדת לחשבון הבנק $' + cash.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
});

mp.events.addCommand('withdraw', async (player, fullText, cash) => {
    if(!isNumeric(cash)) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - הכסף שהוכנס אינו מספר]');
    }

    if(Number(cash) <= 0) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - המספר שהוכנס להפקיד אינו חוקי]');
    }

    if(Number(cash) > player.bank) {
        return player.outputChatBox('!{#FB4E4E}שגיאת שרת] - אתה לא יכול להפקיד יותר כסף ממה שיש לך בארנק]');
    }

    const result = await functions.withdrawMoney(player, Number(cash));
    if(result) {
        player.bank = player.bank - Number(cash);
        player.wallet = player.wallet + Number(cash);
        player.call('client:playerHud:setMoneyInfo', [player.bank, player.wallet]);
        return player.outputChatBox('משכת $' + cash.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' מחשבון הבנק שלך');
    }
});

function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
        !isNaN(parseFloat(str));
}
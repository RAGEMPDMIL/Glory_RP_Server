module.exports.isNumeric = function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
        !isNaN(parseFloat(str));
}

module.exports.showErrorChat = function showErrorChat(player,error) {
    return player.outputChatBox(`!{#FB4E4E}[Server-Error] ${error}`);
}
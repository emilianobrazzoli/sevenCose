 

module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'Non c\'è vento',
            where: channelID
        }

        var channel = memory.getChannel(channelID);
        var args = message.substring(1).split(' ');
        if (args.length >= 2) {
            var cmd = args[1];

            switch (cmd) {
                case 'tira':
                    if (args.length >= 3) {
                        //respond.what = 'Peschi in ordine:\n' + action.roll( args[2]);
                    } else {
                        respond.what = 'Command wrong: dichiara quanti dadi vuoi tirare es /7s tira 10';
                    }
                    break; 
                case 'aiuto':
                    respond.what = '';
                    break;
                default:
                    respond.what = 'digita /d aiuto';
                    break;
            }
        } else {
            respond.what = 'digita /d aiuto';
        } 
        memory.setChannel(channel.id, channel);
        transport.reply('\n' + respond.what);
    }
};
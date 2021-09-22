 

var action = require('./action.js');
module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'Non c\'è vento',
            where: channelID
        }
 
        var args = message.substring(1).split(' ');
        console.log('argomienti: '+args);
        if (args.length >= 2) {
            var cmd = args[1];

            console.log('Comando: '+cmd);
            switch (cmd) {
                case 'tira':
                    if (args.length >= 3) {
                        var bonus =  0;
                        var soglia= 10;
                    
                        if(args.includes('soglia')){
                            var index= args.indexOf('soglia');
                            soglia=args[index+1];
                        }
                        if(args.includes('bonus')){
                            var index= args.indexOf('bonus');
                            bonus=args[index+1];
                        }
                        var esplosioni=args.includes('esplodi');
                        console.log(args[2]+" "+soglia+" "+bonus+" "+esplosioni);
                        respond.what =  action.roll( args[2], parseInt(soglia),parseInt(bonus),esplosioni);
                    } else {
                        respond.what = 'Command wrong: dichiara quanti dadi vuoi tirare es /7s tira 10';
                    }
                    break; 
                case 'aiuto':
                    respond.what = '';
                    break;
                default:
                    respond.what = 'digita /7s aiuto';
                    break;
            }
        } else {
            respond.what = 'digita /7s aiuto';
        }  
        transport.reply('\n' + respond.what);
    }
};
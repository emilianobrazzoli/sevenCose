 

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
                    respond.what = 'Ciao marinaio! '
                    +'Il comando base è /7s tira N dove N è il numero di dadi che tirerai!\n' 
                    +'Aggiungendo esplodi ogni 10 verrà ritirato!\n' 
                    +'Aggingendo bonus N sommerai una cifra ad ogni dado tirato\n' 
                    +'Puoi modificare la soglia di incremento con soglia N dove N è la nuova soglia\n'  ;
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
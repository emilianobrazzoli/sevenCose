 

var action = require('./action.js');
module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'Non c\'è vento',
            where: channelID
        }
 
        var args = message.toLowerCase().substring(1).split(' ');
        console.log('argomienti: '+args);
        if (args.length >= 2) {
            var cmd = args[1];

            //console.log('Comando: '+cmd);
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
                       // console.log(args[2]+" "+soglia+" "+bonus+" "+esplosioni)//
                        respond.what =  action.roll( args[2], parseInt(soglia),parseInt(bonus),esplosioni,'ita');
                    } else {
                        respond.what = 'Command wrong: dichiara quanti dadi vuoi tirare es /7s tira 10';
                    }
                    break; 
                case 'roll':
                    if (args.length >= 3) {
                        var bonus =  0;
                        var soglia= 10;
                    
                        if(args.includes('threshold')){
                            var index= args.indexOf('threshold');
                            soglia=args[index+1];
                        }
                        if(args.includes('bonus')){
                            var index= args.indexOf('bonus');
                            bonus=args[index+1];
                        }
                        var esplosioni=args.includes('explode'); 
                        respond.what =  action.roll( args[2], parseInt(soglia),parseInt(bonus),esplosioni,'eng');
                    } else {
                        respond.what = 'Command wrong: state how many dice you want to roll and 7s roll 10';
                    }
                    break; 
                case 'aiuto':
                    respond.what = 'Ciao marinaio! '
                    +'Il comando base è "/7s tira N" dove N è il numero di dadi che tirerai!\n' 
                    +'Aggiungendo "esplodi" ogni 10 verrà ritirato!\n' 
                    +'Aggiungendo "bonus N" sommerai una cifra ad ogni dado tirato\n' 
                    +'Aggiungendo "soglia N" modificherai la soglia in N (di default è a 10)\n'  ;
                    break; 
                case 'help':
                    respond.what = 'Hello sailor! '
                    + 'The basic command is "/ 7s roll N" where N is the number of dice you will roll! \ N'
                    + 'By adding "explode" every 10 will retire another dice! \ N'
                    + 'By adding "bonus N" you will add a bonus to each die rolled \ n'
                    + 'By adding "threshold N" will change the threshold to N (default is 10) \ n';
                    break;
                default:
                    respond.what = 'digita /7s aiuto | type /7s help';
                    break;
            }
        } else {
            respond.what = 'digita /7s aiuto | type /7s help';
        }  
        transport.reply('\n' + respond.what);
    }
};
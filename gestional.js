 

var action = require('./action.js');
module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'ERROR: no input recorded',
            where: channelID
        }
 
        var args = message.toLowerCase().split(' ');
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
                    respond.what = 'Ciao marinaio!\n '
                    +'Il comando base è "/7s tira N" o "7s N" dove N è il numero di dadi che tirerai!\n' 
                    +'Aggiungendo "esplodi" o "e" ogni 10 verrà ritirato!\n' 
                    +'Aggiungendo "bonus N" o "b" sommerai una cifra N ad ogni dado tirato\n' 
                    +'Aggiungendo "soglia N" o "s" modificherai la soglia in N (di default è a 10)\n' 
                    +'(Viva la carbonara)\n'  ;
                    break; 
                case 'help':
                    respond.what = 'Hello sailor!\n '
                    + 'The basic command is "/ 7s roll N" where N is the number of dice you will roll! \n'
                    + 'By adding "explode" every 10 will retire another dice! \n'
                    + 'By adding "bonus N" you will add the bonus N to each die rolled \n'
                    + 'By adding "threshold N" will change the threshold to N (default is 10) \n';
                    break;
                default:
                    if(isNaN(cmd)){
                        respond.what = 'digita /7s aiuto | type /7s help';
                    }else{
                        var bonus =  0;
                        var soglia= 10;
                    
                        if(args.includes('s')){
                            var index= args.indexOf('s');
                            soglia=args[index+1];
                        }
                        if(args.includes('b')){
                            var index= args.indexOf('b');
                            bonus=args[index+1];
                        }
                        var esplosioni=args.includes('e'); 
                        respond.what =  action.roll( args[1], parseInt(soglia),parseInt(bonus),esplosioni,'ita');
                    }
                    break;
            }
        } else {
            respond.what = 'digita /7s aiuto | type /7s help';
        }  
        transport.reply('\n' + respond.what);
    }
};
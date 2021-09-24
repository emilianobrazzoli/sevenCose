var commands = ['aiuto','help','t','c','7s','/7s','s','b','e','u','v'];
var help = 'Ciao marinaio!\n'
+'Il comando base è  "/7s N" dove N è il numero di dadi che tirerai!\n' 
+'Aggiungendo "e" ogni 10 verrà ritirato!\n' 
+'Aggiungendo "b N" sommerai una cifra N ad ogni dado tirato\n' 
+'Aggiungendo "s N" modificherai la soglia in N (di default è a 10)\n'
+'Aggiungendo "v N"aggiungerai N dadi spregevoli al tiro\n'
+'Se non sbagli troppo i comandi cercherò comunque di capirti!\n' 
+'(Viva la CarbonaraRoleplay)\n'
+'-----------\n'
+'Hello sailor!\n'
+ 'The basic command is "/ 7s N" where N is the number of dice you will roll! \n'
+ 'By adding "e" every 10 will retire another dice! \n'
+ 'By adding "b N" you will add the bonus N to each die rolled \n'
+ 'By adding "t  N" will change the threshold to N (default is 10) \n'
+ 'By adding "v  N" you will add the N villain dice to the pool \n'
+ 'For eng result add uk to the command \n';

var split = function( element, argsSplitted){
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index]; 
        //console.log(command+"   "+ element+"   "+ argsSplitted);
        if(element){
            matches = element.match(/\d+/g);
            if(element.startsWith(command)){// //endsWith 
                argsSplitted.push(command);
                if(element!='7s' && element!='/7s' &&  matches && matches[0] && !isNaN(matches[0])){ 
                    var elements= element.split(command); 
                    if(elements){
                        elements.forEach(e => {
                            if(e){ 
                                argsSplitted = split( e, argsSplitted);
                            }  
                        });
                        return argsSplitted;
                    }
                    argsSplitted = split( e, argsSplitted);
                } 
                return argsSplitted;
            }else if(!isNaN(element)){
                argsSplitted.push(element); 
                return argsSplitted;
            }else if(!element.startsWith('7s') && !element.startsWith('/7s') &&  matches && matches[0] && !isNaN(matches[0])){
                matches.forEach(matche => { 
                    var elements=element.split(matche); 
                    if(elements){
                        elements.forEach(e => {  
                            if(e){ 
                                argsSplitted = split( e, argsSplitted);
                            }else{
                                argsSplitted.push(matche);  
                            }
                        });
                    }
                });
                return argsSplitted; 
            } 
        }else{
            return;
        }
    }
    return argsSplitted;
}

var splitArgument = function(args){
    var argsSplitted = [];
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        argsSplitted= split(  element, argsSplitted);
    } 
         
    return argsSplitted;
}
/** 

var message = '/7s 7e v2';
var args = message.toLowerCase().split(' ');
args =splitArgument(args);
console.log('argomienti: '+args);
 
*/
var action = require('./action.js');
module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'ERROR: no input recorded',
            where: channelID
        }
 
        var args = message.toLowerCase().split(' ');
        args =splitArgument(args);
        console.log('argomienti: '+args);
        if (args.length >= 2) {
            var cmd = args[1];

            //console.log('Comando: '+cmd);
            switch (cmd) { 
                case 'carbonararoleplay':
                    respond.what = 'Un intenditore!\n'
                    +'Segui il mio creatore sui suoi social assieme ad una manica di pazzi:\n'+
                    'https://linktr.ee/CarbonaraRoleplay \n'  ;
                    break;  
                case 'aiuto':
                    respond.what = help;
                    break; 
                case 'help': 
                    respond.what = help;
                    break;
                default:
                    if(isNaN(cmd)){
                        respond.what = 'Try /7s help';
                    }else{
                        var bonus =  0;
                        var soglia= 10;
                        var villan= 0;
                        var lenguage='ita';
                        if(args.includes('s')){
                            var index= args.indexOf('s');
                            soglia=args[index+1];
                        }
                        if(args.includes('b')){
                            var index= args.indexOf('b');
                            bonus=args[index+1];
                        }
                        var esplosioni=args.includes('e'); 
                        if(args.includes('u')){
                            lenguage='eng';
                        }
                        if(args.includes('v')){
                            var index= args.indexOf('v');
                            villan=args[index+1];
                        }
                        respond.what =  action.roll( args[1], parseInt(soglia),parseInt(bonus),parseInt(villan), esplosioni,lenguage);
                    }
                    break;
            }
        } else {
            respond.what = 'Try /7s help';
        }  
        transport.reply('\n' + respond.what);
    }
};
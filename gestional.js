
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
var commands = ['aiuto','help','ita','eng','t','c','7s','/7s','s','b','e','v'];
var aiuto = 'Ciao marinaio!\n'
+'Il comando base è  "/7s N" dove N è il numero di dadi che tirerai!\n' 
+'Aggiungendo "e" ogni 10 verrà ritirato!\n' 
+'Aggiungendo "b N" sommerai una cifra N ad ogni dado tirato\n' 
+'Aggiungendo "s N" modificherai la soglia in N (di default è a 10)\n'
+'Aggiungendo "v N"aggiungerai N dadi spregevoli al tiro\n'
+'Type /7s eng to change to eng lenguage\n';
var help ='Hello sailor, add uk for english result!\n'
+ 'The basic command is "/ 7s N" where N is the number of dice you will roll! \n'
+ 'By adding "e" every 10 will retire another dice! \n'
+ 'By adding "b N" you will add the bonus N to each die rolled \n'
+ 'By adding "t  N" will change the threshold to N (default is 10) \n'
+ 'By adding "v  N" you will add the N villain dice to the pool \n'
+ 'Type /7s ita to change to ita lenguage\n' ;

var action = require('./action.js');
var fs = require('fs'); 
var path = './db.json';
var checkDb = function(){ 
    try {
        if (fs.existsSync(path)) {
          return true;
        }
      } catch(err) {
        console.error(err)
      }
      return false;
}
var sessionDb = function(){
    if(checkDb()){
        var db = require(path);
        return db;
    }else{
        var db = { titol:'DB di sevenSea', channel: []};
        var stringed =  JSON.stringify(db);
        console.log(stringed); 
        fs.writeFileSync(path, stringed.toString())
        return sessionDb();
    }
}
var flush = function(sampleObject){
    fs.writeFile(path, JSON.stringify(sampleObject), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Flush with success!");
    });
} 
var saveChannel = function(channelToSave){
    var found = false;
    var db = sessionDb();
    db.channel.forEach(channel => {
        if(channel.id === channelToSave.id){
            channel = channelToSave;
            found = true; 
        }
    });
    if(!found){
        db.channel.push(channelToSave);
    } 
    flush(db);
} 
var searchChannel = function(channelID){
    var found = false;
    var db = sessionDb();
    var channelToFind = {
        id: channelID,
        len: 'eng'
    };
    db.channel.forEach(channel => {
        if(channel.id === channelToFind.id){
            channelToFind = channel;
            found = true; 
        }
    });
    if(!found){
        saveChannel(channelToFind);
    }
    return channelToFind;
}  

module.exports = {
    commandDice: function(userID, channelID, message, transport) {
        var respond = {
            who: userID,
            what: 'ERROR: no input recorded',
            where: channelID
        };
        var channel = searchChannel(channelID);
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
                case 'help': 
                    if(channel.len==='ita'){
                        respond.what = aiuto;
                    }else{
                        respond.what = help;
                    }
                    break;
                case 'eng': 
                    channel.len ='eng';
                    saveChannel(channel);
                    respond.what = 'Yes sir!';
                    break;
                case 'ita': 
                    channel.len ='ita';
                    saveChannel(channel);
                    respond.what = 'Sì signore!';
                    break;
                default:
                    if(isNaN(cmd)){
                        if(channel.len==='ita'){
                            respond.what = 'Prova /7s help';
                        }else{
                            respond.what = 'Try /7s help';
                        }
                    }else{
                        var bonus =  0;
                        var soglia= 10;
                        var villan= 0;
                        var lenguage='ita';
                        if(args.includes('s')){
                            var index= args.indexOf('s');
                            soglia=args[index+1];
                            if(!soglia){
                                soglia=10;
                            }
                        }else if(args.includes('t')){
                            var index= args.indexOf('t');
                            soglia=args[index+1];
                            if(!soglia){
                                soglia=10;
                            }
                        }
                        if(args.includes('b')){
                            var index= args.indexOf('b');
                            bonus=args[index+1], 0;
                        } 
                        if(args.includes('v')){
                            var index= args.indexOf('v');
                            villan=args[index+1], 0;
                        }
                        var esplosioni=args.includes('e'); 
                        respond.what =  action.roll( args[1], parseInt(soglia),parseInt(bonus),parseInt(villan), esplosioni,channel.len);
                    }
                    break;
            }
        } else {
            if(channel.len==='ita'){
                respond.what = 'Prova /7s help';
            }else{
                respond.what = 'Try /7s help';
            }
        }  
        transport.reply('\n' + respond.what);
    }
};
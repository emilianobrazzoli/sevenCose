/** GESTISCE I PARAMETRI DI COMANDO */
var commands = ['aiuto','help','ita','eng','t','c','7s','/7s','s','b','e','v']; 
var property = require('./property.js');
var manager = require('./manager.js');
var action = require('./action.js');

var split = function( element, argsSplitted){
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index];  
        if(element){
            matches = element.match(/\d+/g);
            if(element.startsWith(command)){ 
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
    };
    return argsSplitted;
};

var commandDice = function(userID, channelID, message, transport, bot) {
    
    var respond = {
        who: userID,
        what: 'ERROR: no input recorded',
        where: channelID
    };

    var channel = manager.searchChannel(channelID);
    var args = message.toLowerCase().split(' ');
    args =splitArgument(args);
    console.log('commands: '+args);

    if (args.length >= 2) {
        var cmd = args[1]; 
        switch (cmd) { 
            case 'c':
                respond.what = property.label('carbonara'+channel.len);
                break;
            case 'help':  
                respond.what = property.label('help'+channel.len); 
                break;
            case 'eng': 
                channel.len ='eng';
                manager.saveChannel(channel);
                respond.what = property.label('yessir'+channel.len);  
                break;
            case 'ita': 
                channel.len ='ita';
                manager.saveChannel(channel);
                respond.what = property.label('yessir'+channel.len);  
                break;
            default:
                if(isNaN(cmd)){
                    respond.what = property.label('try'+channel.len);  
                }else{
                    var bonus =  0;
                    var soglia= 10;
                    var villan= 0; 
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
        respond.what = property.label('try'+channel.len);  
    }  
    transport.reply('>>> \n' + respond.what);
};

module.exports = {
    commandDice: function(userID, channelID, message, transport, bot) {
        return commandDice(userID, channelID, message, transport, bot);
    }
};
var commands = ['aiuto','help','ita','eng','t','c','7s','/7s','s','b','e','v']; 
var action = require('./action.js');
var manager = require('./manager.js'); 
var property = require('./property.js'); 
var green = 3447003;
var red = 15158332;
var white = 16777215;
var yellow = 16705372;

var splitArgument = function(args){
    var argsSplitted = [];
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        argsSplitted= split(  element, argsSplitted);
    };
    return argsSplitted;
};

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
var stringerDices = function(dices, tag) {
    var message = '[';
    dices.forEach(dice => {   
        if(dice.vile){
            message += " "+property.bold()+tag+dice.dice+tag+property.bold()+" ";
        }else{
            message += " "+tag+dice.dice+tag+" ";
        } 
    });
    return message+']'
}


var imageDices = function(dices, burned,img, space) { 
    img.push({ src:  property.sx()+".png", x: space,y: 0 }); 
        space=space+30; 
    dices.forEach(dice => { 
        if(burned){
            if(dice.vile){
                img.push({ src: property.vbdice()+(dice.dice-1)+".png", x: space, y: 0 });
            }else{
                img.push({ src:  property.sbdice()+(dice.dice-1)+".png", x: space, y: 0 });
            } 
        }else{
            if(dice.vile){
                img.push({ src:  property.vdice()+(dice.dice-1)+".png", x:space, y: 0 });
            }else{
                img.push({ src:  property.sdice()+(dice.dice-1)+".png", x: space, y: 0 });
            } 
        }
        space=space+130;
    });
    img.push({ src:  property.dx()+".png", x: space, y: 0 });
    space=space+30;
    return [img,space];
}
 

var retunResultImg= function(rtrn, response){ 
    rtrn.result.forEach(dicesCouple => { 
        images = imageDices(dicesCouple,false,response.img,response.space);
        response.space = images[1];
        response.img = images[0];
    }); 
    rtrn.discardedResult.forEach(dicesCouple => { 
        var images=imageDices(dicesCouple, true,response.img,response.space); 
        response.space = images[1];
        response.img = images[0];
    });  
    return response;
}  
 
var addMoreResponse = function(descr,decorator,response){ 
    response.value.push({
        what: descr,
        decorator: decorator
    });  
    return response;
};
var addResponse = function (name, descr) {
    var response={};
    response.space = 0;
    response.img=[];
    response.name=name;
    response.value=[];
    response.color= yellow;
    response= addMoreResponse(descr,'', response);  
    return response;
}
var resultResponse = function (result) {
    var response={};
    response.space = 0;
    response.img=[];
    response.name='result';
    response.value=[];
    response.color= green; 
    response= retunResultImg(result,response);
    response = addMoreResponse('raises',result.raises,response) ;
    response = addMoreResponse('trashdice',result.trashdice,response);
    var message = '';
    result.result.forEach(dicesCouple => { 
        message +=stringerDices(dicesCouple,'');
    }); 
    message += '   ';
    result.discardedResult.forEach(dicesCouple => { 
        message +=stringerDices(dicesCouple, ''); 
    }); 
    response = addMoreResponse('void',message,response);
    return response;
}
var actionCalling = function(response, args){
    
    var bonus =  0;
    var soglia= 10;
    var vile= 0; 
    var numberDice= args[1]; 
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
        vile=args[index+1], 0;
    }
    var esplosioni=args.includes('e');  

    
    if(numberDice<='0' || isNaN(numberDice) || numberDice>50){ 
        response= (addResponse('Funny','funny')); 

    }else{ 
        result =  action.roll( numberDice, parseInt(soglia),parseInt(bonus),parseInt(vile), esplosioni); 
        response = resultResponse(result); 
    }  
    return response;
}
var commandDice = function(args, channelId){
    
    var channel = manager.searchChannel(channelId);
    var response ={}; 
    args =splitArgument(args);
    console.log(channel.len+' commands: '+args);

    if (args.length >= 2) {
        var cmd = args[1]; 
        switch (cmd) { 
            case 'c':
                response =(addResponse( 'Carbonara', 'carbonara')); 
                break;
            case 'help':  
                response=(addResponse( 'Help', 'help'));
                break;
            case 'eng': 
                channel.len ='eng';
                manager.saveChannel(channel);
                response=(addResponse( 'English', 'yessir')); 
                break;
            case 'ita': 
                channel.len ='ita';
                manager.saveChannel(channel);
                response=(addResponse( 'Italiano','yessir'));  
                break;
            default:
                if(isNaN(cmd)){
                    response=(addResponse( 'Need help?', 'try'));   
                }else{
                    response = actionCalling(response, args);
                }
                break;
        }
    } else {
        response=(addResponse('Need help?', 'try'));    
    }  
    return response;
}

module.exports = {
    commandDice: function(  args, channelId ) {
        return commandDice(  args, channelId);
    }
};

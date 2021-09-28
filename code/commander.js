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
    var bonuses = 0;
    dices.forEach(dice => {   
        if(dice.vile){
            message += " "+property.bold()+tag+dice.dice+tag+property.bold()+" ";
        }else{
            message += " "+tag+dice.dice+tag+" ";
        } 
        if(dice.bonus){ 
            bonuses +=dice.bonus;
        }
    });
    if(bonuses>0){
        message += tag+"+"+bonuses+""+tag;
    }
    return message+']'
}


var imageDices = function(dices, burned,img, width, height) {    
    dices.forEach(dice => { 
        if(burned){
            if(dice.vile){
                img.push({ src: property.vbdice()+(dice.dice-1)+".png", x: width, y: height });
            }else{
                img.push({ src:  property.sbdice()+(dice.dice-1)+".png", x: width, y: height});
            } 
        }else{
            if(dice.vile){
                img.push({ src:  property.vdice()+(dice.dice-1)+".png", x:width, y: height });
            }else{
                img.push({ src:  property.sdice()+(dice.dice-1)+".png", x: width, y: height});
            } 
        }
        width+=130;
    });
    img.push({ src:  property.dx()+".png", x: width, y: height });
    width+=30;
    return [img,width, height];
}
 

var retunResultImg= function(rtrn, response){ 
    var likewidth= response.width;
    var over= false;
    rtrn.result.forEach(dicesCouple => { 
        if(likewidth+(dicesCouple.length)*130>650){
            likewidth = 0;
            response.height +=130;
            over =true; 
        }
        var images = imageDices(dicesCouple,false,response.img,likewidth, response.height);
        if(!over || (images[1]>  response.width)){ 
            response.width = images[1];
        }
        if(images[1] >500){ 
            likewidth = 0;
            response.height +=130;
            over =true;
        }else{
            likewidth =  images[1];
        }  
        response.img = images[0];
    }); 
    rtrn.discardedResult.forEach(dicesCouple => {  
        var images=imageDices(dicesCouple,true,response.img,likewidth,response.height);
        if(!over || (images[1]>  response.width)){ 
            response.width = images[1];
        }
        if(images[1] >500){ 
            likewidth = 0;
            response.height +=130;
            over =true;
        }else{
            likewidth =  images[1];
        }  
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
    response.width = 0;
    response.img=[];
    response.name=name;
    response.value=[];
    response.color= yellow;
    response= addMoreResponse(descr,'', response);  
    return response;
}
var resultResponse = function (result) {
    var response={};
    response.width = 0;
    response.height = 0;
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
        message +=stringerDices(dicesCouple, property.barra()); 
    }); 
    response = addMoreResponse('void',message,response);
    return response;
}
var getArgValue = function (args, tag, def) {
    var soglia = null;
    if(args.includes(tag)){
        var index= args.indexOf(tag);
        soglia=args[index+1];
        if(!soglia){
            soglia=def;
        } 
    }
    return soglia;
}

var actionCalling = function(response, args){
    
    var bonus = getArgValue(args,'b',0) || 0;
    var soglia= getArgValue(args,'s', 10) || getArgValue(args,'t', 10) || 10;
    var vile= getArgValue(args,'v',0); 
    var numberDice= args[1];    
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

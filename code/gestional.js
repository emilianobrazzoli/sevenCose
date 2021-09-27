/** DELEGA LE AZIONI */ 
var commander = require('./commander.js'); 
var sender = require('./sender.js'); 

var main = function(message) {
    var userID =message.author.id; 
    var channelID=message.channel.id; 
    console.log(userID+' in '+ channelID+' do '+ message.content.toString());
    var args =  message.content.toString().toLowerCase().split(' ');
    var response = commander.commandDice(args,channelID);
    sender.send(response, message); 
};

module.exports = {
    main: function(message) {
        return main(message);
    }
};

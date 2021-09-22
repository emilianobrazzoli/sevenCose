var Discord = require("discord.js");
var gestional = require('./gestional.js');
//var delegate = require('./delegate.js');
const express = require('express');
const path = require('path');
const app = express();
//var process = {env: {TOKEN:'', PORT:''}};

app.use(express.static(__dirname + '/dist/'));
app.use('/src/assets', express.static(__dirname + '/src/assets/'));


//Initialize Discord Bot
var bot = new Discord.Client();

var cmd = function(message) {
    if (message.content.substring(0, 2) == '/7s') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandDice(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } 
	/*
    if (message.content.substring(0, 2) == '/d') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandDecks(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/c') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandCommon(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    } else if (message.content.substring(0, 2) == '/t') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandTarot(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    }*/
};

bot.on("ready", () => {
    console.log('Pronto a navigare i sette mari');
});

// message.channel
bot.on('message', message => {
    cmd(message);
});
bot.login(process.env.TOKEN || '');

//coffeeeeee every 3 minuts
/*

console.log( "Can we meet at the a coffee machine?");

const http = require('http');
app.get("/", (request, response) => {
console.log( "Received a coffee: coffeeeeeeeeeee");
response.sendStatus(200);
});


setInterval(() => {
    console.log( "Offer a coffee: coffeeeeeeeeeee");
    http.get(`http://caffeinabot2.glitch.me/`);
    http.get(`http://caffeinabot.glitch.me/`);
    delegate.clean();
}, 280000);
*/

app.listen(process.env.PORT || 8080);
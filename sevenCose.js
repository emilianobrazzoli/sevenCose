var Discord = require("discord.js");
var gestional = require('./gestional.js'); 
const express = require('express');
const path = require('path');
const app = express();  

//INIT .ENV VAR
if(!process || !process.env || !process.env.TOKEN){
    require('dotenv').config();
}

var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';

app.use(express.static(__dirname + '/dist/'));
app.use('/src/assets', express.static(__dirname + '/src/assets/'));

//Initialize Discord Bot
var bot =  new Discord.Client()

var cmd = function(message) {
    //console.log('Comando arrivato');
    if (message.content.substring(0, 3) == '/7s' || message.content.substring(0, 3) == '/7S' ||
        message.content.substring(0, 2) == '7s' || message.content.substring(0, 2) == '7S') {
        console.log(message.author.id+' in '+ message.channel.id+' do '+ message.content.toString());
        var respond = gestional.commandDice(message.author.id, message.channel.id, message.content.toString().toLowerCase(), message);
    }  
};

bot.on("ready", () => {
    console.log('Pronto a navigare i sette mari su '+port);
});
 
bot.on('message', message => {
    cmd(message);
});

bot.login(token);

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
    http.get('http://sleepp.glitch.me/'); 
}, 280000); 
*/
app.listen(port);
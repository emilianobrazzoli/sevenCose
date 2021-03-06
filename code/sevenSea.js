/** MAIN */
var Discord = require("discord.js");
var gestional = require('./gestional.js'); 
const express = require('express'); 
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
    if (message.content.substring(0, 3) == '/7s' || message.content.substring(0, 3) == '/7S'  ) {
        gestional.main( message  );

    }  
};

bot.on("ready", () => {
    
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'Preparing carbonara',
            type: 'STREAMING',
            url: 'https://www.twitch.tv/carbonararoleplay'
        }
    });
    console.log('Ready for the seven sea on '+port);
});
 
bot.on('message', message => {
    cmd(message);
});

bot.login(token); 

app.get("/", (request, response) => {
    console.log( "Received a coffee: coffeeeeeeeeeee"); 
    response.sendFile('home.html' , { root: './code/resource/' })
});  
app.listen(port);  
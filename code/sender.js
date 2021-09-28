const mergeImages = require('./furbo.js');
const { Canvas, Image } = require('canvas');  
var green = 3447003;
var red = 15158332;
var white = 16777215;
var yellow = 16705372;
var property = require('./property.js');
var Discord = require("discord.js");
var manager = require('./manager.js'); 

var displayMessage= function (embeds,message ){ 
    embeds.forEach(element => { 
        if(element.img){
            new  mergeImages(element.img, {
                Canvas: Canvas,
                Image: Image,
                width: element.space,
                height: 130
              })
            .then(b64 => { 
                var fav = b64.split(",").slice(1).join(",");
                var imageStream = Buffer.from(fav, "base64");
                var attachment = new Discord.MessageAttachment(imageStream, "dices.png");
                var embed = new Discord.MessageEmbed()
                .setImage('attachment://dices.png')
                .setTitle(element.name)
                .setColor(element.color)
                .setDescription(element.value)
                .attachFiles([attachment])  
                message.channel.send(embed);
            });
        } else{
            var embed=new Discord.MessageEmbed()
            .setTitle(element.name)
            .setColor(element.color)
            .setDescription(element.value) ;  
        }
    });
};
 
/** response= [ {
        title: title, 
        what: descr,
        img: img,
        decorator
    }];
 */
var createEmbendedByResponse = function(embed,response, message, language){ 
    var value =  property.label(response.what+language); 
    if(response.decorator){
        embed.value =embed.value+"\n"+value+" "+response.decorator;
    } else{
        embed.value =embed.value+"\n"+value;
    }
    return embed;
}
                         
var createEmbendedByResponses = function(response, message, language){
    var name =  property.label(response.name+language);
    var embeds = [];
    var embed= {};
    embed.value = '';
    embed.color =response.color
    embed.img = response.img;
    response.value.forEach(element => {
        embed= createEmbendedByResponse(embed,element, message, language) 
    });
    console.log(embed);
    embed.space = response.space;
    embed.name=name;
    embeds.push(embed);
    return embeds;
}
var send = function(response, message){
    var channelID=message.channel.id;  
    var language = manager.searchChannel(channelID).len;
    embeds = createEmbendedByResponses(response, message, language);
    displayMessage(embeds,message);
}
 

module.exports = {
    send: function(response, message) {
        return send(response, message);
    }
};  
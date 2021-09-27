const mergeImages = require('merge-image');
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
        //console.log(element); 
        message.channel.send(element);
    });
};
 
/** response= [ {
        title: title, 
        what: descr,
        img: img,
        decorator
    }];
 */
var createEmbendedByResponse = function(response, message, language){
    var name =  property.label(response.title+language);
    var value =  property.label(response.what+language); 
    if(response.decorator){
        value = value+" "+response.decorator;
    }
    var embed = null; 
    if(response.img){
        mergeImages(response.img, {
            Canvas: Canvas,
            Image: Image,
            width: response.space,
            height: 130
          })
        .then(b64 => { 
            var fav = b64.split(",").slice(1).join(",");
            var imageStream = Buffer.from(fav, "base64");
            var attachment = new Discord.MessageAttachment(imageStream, "favicon.png");
            embed = new Discord.MessageEmbed()
            .setTitle(name)
            .setColor(green)
            .setDescription(value)
            .attachFiles([attachment])  
            message.channel.send(embed);
        });
    } else{
        embed=new Discord.MessageEmbed()
        .setTitle(name)
        .setColor(green)
        .setDescription(value) ;  
    }
    return embed;
}
                         
var createEmbendedByResponses = function(response, message, language){
    var embeds = [];
    response.forEach(element => {
        var embed= createEmbendedByResponse(element, message, language)
        if(embed){
            embeds.push(embed);
        }
    });
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
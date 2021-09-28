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
    let tMember = message.guild.members.cache.get(message.author.id); 
    var avtar = "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg";
    embeds.forEach(element => { 
        if(element.img && element.img.length>0){
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
                .setAuthor(tMember.displayName,avtar)
                .setDescription(element.value)
                .setTimestamp()
                .setFooter('Created by CarbonaraRoleplay - Sended',property.label('logo'))
                .attachFiles([attachment])  ;
                message.channel.send(embed);
            });
        } else{
            var embed=new Discord.MessageEmbed()
            .setTitle(element.name)
            .setThumbnail(property.label('logo'))
            .setAuthor(tMember.displayName,avtar)
            .setColor(element.color)
            .setTimestamp()
            .setFooter('Created by CarbonaraRoleplay - Sended',property.label('logo'))
            .setDescription(element.value) ;  
            message.channel.send(embed);
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
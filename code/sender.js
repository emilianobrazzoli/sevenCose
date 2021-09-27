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
    console.log(response);
    var name =  property.label(response.title+language);
    var value =  property.label(response.what+language); 
    if(response.decorator){
        value = value+" "+response.decorator;
    }
    var embed = null; 
    if(response.img){
        new  mergeImages(response.img, {
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
var img =[
    { src: './code/resource/dice/sx.png', x: 0, y: 0 },
    { src: './code/resource/dice/sdice/d_00009.png', x: 30, y: 0 },
    { src: './code/resource/dice/dx.png', x: 160, y: 0 },
    { src: './code/resource/dice/sx.png', x: 190, y: 0 },
    { src: './code/resource/dice/sdice/d_00009.png', x: 220, y: 0 },
    { src: './code/resource/dice/dx.png', x: 350, y: 0 },
    { src: './code/resource/dice/sx.png', x: 380, y: 0 },
    { src: './code/resource/dice/sdice/d_00008.png', x: 410, y: 0 },
    { src: './code/resource/dice/sdice/d_00000.png', x: 540, y: 0 },
    { src: './code/resource/dice/dx.png', x: 670, y: 0 },
    { src: './code/resource/dice/sx.png', x: 700, y: 0 },
    { src: './code/resource/dice/sdice/d_00008.png', x: 730, y: 0 },
    { src: './code/resource/dice/sdice/d_00001.png', x: 860, y: 0 },
    { src: './code/resource/dice/dx.png', x: 990, y: 0 },
    { src: './code/resource/dice/sx.png', x: 1020, y: 0 },
    { src: './code/resource/dice/sdice/d_00007.png', x: 1050, y: 0 },
    { src: './code/resource/dice/sdice/d_00003.png', x: 1180, y: 0 },
    { src: './code/resource/dice/dx.png', x: 1310, y: 0 },
    { src: './code/resource/dice/sx.png', x: 1340, y: 0 },
    { src: './code/resource/dice/sdice/d_00006.png', x: 1370, y: 0 },
    { src: './code/resource/dice/sdice/d_00004.png', x: 1500, y: 0 },
    { src: './code/resource/dice/dx.png', x: 1630, y: 0 }
  ];
new  mergeImages(img, {
    Canvas: Canvas,
    Image: Image,
    width: 1660,
    height: 130
  })
.then(b64 => { 
    var fav = b64.split(",").slice(1).join(",");
    var imageStream = Buffer.from(fav, "base64"); 
    console.log(imageStream);
});
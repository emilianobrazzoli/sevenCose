/** MANEGGIA I DATI DA SALVARE */
var fs = require('fs'); 
var path = './resource/db.json';    
var pathWrite = './code/resource/db.json';     

var checkDb = function(){ 
    try {
        if (fs.existsSync(pathWrite)) {
          return true;
        }
      } catch(err) {
        console.error(err)
      }
      return false;
}
var sessionDb = function(){
    if(checkDb()){
        var db = require(path);
        return db;
    }else{
        var db = { titol:'DB sevenSea', channel: []};
        var stringed =  JSON.stringify(db);
        console.log(stringed); 
        fs.writeFileSync(pathWrite, stringed.toString());
        return sessionDb();
    }
}
var flush = function(sampleObject){
    fs.writeFile(pathWrite, JSON.stringify(sampleObject), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Flush with success!");
    });
} 
var saveChannel = function(channelToSave){
    var found = false;
    var db = sessionDb();
    db.channel.forEach(channel => {
        if(channel.id === channelToSave.id){
            channel = channelToSave;
            found = true; 
        }
    });
    if(!found){
        db.channel.push(channelToSave);
    } 
    flush(db);
} 
var searchChannel = function(channelID){
    var found = false;
    var db = sessionDb();
    var channelToFind = {
        id: channelID,
        len: 'eng'
    };
    db.channel.forEach(channel => {
        if(channel.id === channelToFind.id){
            channelToFind = channel;
            found = true; 
        }
    });
    if(!found){
        saveChannel(channelToFind);
    }
    return channelToFind;
}

module.exports = {
    searchChannel : function(channelID){
        return searchChannel(channelID);
    },
    saveChannel : function(channelID){
        return saveChannel(channelID);
    }
}
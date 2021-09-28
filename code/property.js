/** MANEGGIA LE LABEL */
var fs = require('fs'); 
var italicTAG ='*';
var boldTAG ='**';
var barratoTAG ='~~';
var underlineTAG ='__';
var logo = 'https://panels-images.twitch.tv/panel-100479319-image-00fcadfd-c445-491b-a2c7-8a1e1127c634';
var logo2 = 'https://panels-images.twitch.tv/panel-100479319-image-c51aa119-4ff0-45c3-8cdc-b43f91620ca7';
/*
 
var sdice = './code/resource/dice/sdice/d_0000';
var sbdice = './code/resource/dice/sbdice/d_0000';
var vdice = './code/resource/dice/vdice/d_0000';
var vbdice = './code/resource/dice/vbdice/d_0000';
var dx = './code/resource/dice/dx';
var sx = './code/resource/dice/sx';*//**/
var sdice = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/sdice/d_0000';
var sbdice = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/sbdice/d_0000';
var vdice = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/vdice/d_0000';
var vbdice = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/vbdice/d_0000';
var dx = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/dx';
var sx = 'https://raw.githubusercontent.com/emilianobrazzoli/sevenCose/master/code/resource/dice/sx';
module.exports = {
    logo : function() {
        return logo;
    },
    logo2 : function() {
        return logo2;
    },
    sx: function() {
        return sx;
    },
    dx: function() {
        return dx;
    },
    bold: function() {
        return boldTAG;
    },
    barra: function() {
        return barratoTAG;
    },
    sdice: function() {
        return sdice;
    },
    sbdice: function() {
        return sbdice;
    },
    vbdice: function() {
        return vbdice;
    },
    vdice: function() {
        return vdice;
    },
    label: function(label) {
        var message = '';
        switch (label) { 
            case 'helpita': 
                message = fs.readFileSync('./code/resource/messageita.txt',{ encoding: 'utf8' });
                break;
            case 'helpeng':
                message = fs.readFileSync('./code/resource/messageeng.txt',{ encoding: 'utf8' });
                break;
            case 'Helpita': 
                message = 'Guida';
                break;
            case 'Carbonaraita':
                message = 'Carbonara';
                break;
            case 'voideng': 
                message = '';
                break;
            case 'voidita':
                message = '';
                break;
            case 'Carbonaraeng': 
                message = 'Carbonara';
                break;
            case 'Englisheng':
                message = 'English';
                break;
            case 'Italianoita': 
                message = 'Italiano';
                break;
            case 'Need help?eng':
                message = 'Need help?';
                break;
            case 'Need help?ita': 
                message = 'Need help?';
                break;
            case 'Helpeng':
                message = 'Commands';
                break;
            case 'tryeng':
                message = 'Try **/7s help**'; 
                break;
            case 'tryita':
                message = 'Prova **/7s help**'; 
                break;
            case 'carbonaraita':
                message =  'Un intenditore!\n'
                +'Segui il mio creatore sui suoi social assieme ad una manica di pazzi:\n'+
                'https://linktr.ee/CarbonaraRoleplay \n';
                break;
            case 'carbonaraeng':
                message =  'Hi!\n'
                +'This bot was made by a carbonararoleplay dude:\n'+
                'https://linktr.ee/CarbonaraRoleplay \n';
                break;
            case 'yessirita':
                message = 'Sì signore!';
                break;
            case 'yessireng':
                message =  'Yes sir!';
                break;
            case 'Funnyeng':
                message =  'AHAHAHAHAHAHAHA!';
                break;
            case 'Funnyita':
                message =  'AHAHAHAHAHAHAHA!';
                break;
            case 'funnyeng':
                message =  'Very funny';
                break;
            case 'funnyita':
                message =  'Molto divertente';
                break;
            case 'resultita':
                message =  'Risultati ';
                break;
            case 'resulteng':
                message =  'Result ';
                break;
            case 'vileindiceita':
                message =  'Dadi Spregevoli ';
                break;
            case 'vileindiceeng':
                message =  'Vile Dice ';
                break; 
            case 'raiseseng':
                message =  'Raises: ';
                break; 
            case 'raisesita':
                message =  'Incrementi: ';
                break; 
            case 'trashdiceeng':
                message =  'Discarded dice: ';
                break; 
            case 'trashdiceita':
                message =  'Dadi scartati: ';
                break; 
            case 'vilDescita':
                message =  '**I dadi in grasseto sono spregevoli**';
                break; 
            case 'vilDesceng':
                message =  '**Bold dice are vile dice**';
                break; 
            case 'corruptita':
                message =  'Punti corruzione ';
                break; 
            case 'corrupteng':
                message =  'Corruption point ';
                break; 
            default:
                message = label;
                break;
        }
        return message;
    }
}
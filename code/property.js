/** MANEGGIA LE LABEL */
var fs = require('fs'); 
var logo = 'https://panels-images.twitch.tv/panel-100479319-image-c51aa119-4ff0-45c3-8cdc-b43f91620ca7';
 
module.exports = {
    label: function(label) {
        var message = '';
        switch (label) { 
            case 'helpita': 
                message = fs.readFileSync('./code/resource/messageita.txt',{ encoding: 'utf8' });
                break;
            case 'helpeng':
                message = fs.readFileSync('./code/resource/messageeng.txt',{ encoding: 'utf8' });
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
                +'This bot was made by a dude of carbonararoleplay team:\n'+
                'https://linktr.ee/CarbonaraRoleplay \n';
                break;
            case 'yessirita':
                message = 'Sì signore!';
                break;
            case 'yessireng':
                message =  'Yes sir!';
                break;
            case 'funnyeng':
                message =  'Very funny';
                break;
            case 'funnyita':
                message =  'Molto divertente';
                break;
            case 'resultita':
                message =  'Risultati: ';
                break;
            case 'resulteng':
                message =  'Result: ';
                break;
            case 'villaindiceita':
                message =  'Dadi Spregevoli ';
                break;
            case 'villaindiceeng':
                message =  'Villain Dice ';
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
            case 'logo':
                message = logo;
                break; 
            default:
                message = '';
                break;
        }
        return message;
    }
}
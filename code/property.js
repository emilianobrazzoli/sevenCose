/** MANEGGIA LE LABEL */
var fs = require('fs'); 
 
module.exports = {
    label: function(label) {
        var message = '';
        switch (label) { 
            case 'helpita': 
                message ='>>> ' +  fs.readFileSync('./code/resource/messageita.txt',{ encoding: 'utf8' });  
            break;
            case 'helpeng':
                message = '>>> ' +  fs.readFileSync('./code/resource/messageeng.txt',{ encoding: 'utf8' });  
            break;
            case 'tryeng':
                message = 'Try /7s help'; 
            break;
            case 'tryita':
                message = 'Prova /7s help'; 
            break;
            case 'carbonara':
                message =  'Un intenditore!\n'
                +'Segui il mio creatore sui suoi social assieme ad una manica di pazzi:\n'+
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
                message =  'Dadi Spregevoli: ';
            break;
            case 'villaindiceeng':
                message =  'Villain Dice: ';
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
            default:
                message = '';
            break;
        }
        return message;
    }
}
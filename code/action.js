/** ESEGUE I COMANDI */
var property = require('./property.js');
var italicTAG ='*';
var boldTAG ='**';
var barratoTAG ='~~';
var underlineTAG ='__';

var ricursiveFindSuccess= function(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus){
    if(finded.length===0){
        if(diceRolled[firstIndex] +bonus>=success){ //il primo va bene
            finded = [firstIndex]; 
            return finded; 
        }else{//non trovo subito all'inizio
            grado = 2;
            total=diceRolled[firstIndex];
            thisIndex=diceRolled.length-1;
            finded = [firstIndex];
            finded.push(0); 
            return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus) ;
        }
    }
    if(thisIndex<=firstIndex){ 
        if(grado >=diceRolled.length){
            if(onlyEqual){
                grado = 2;
                total=diceRolled[firstIndex];
                thisIndex=diceRolled.length-1;
                finded = [firstIndex];
                finded.push(0); 
                return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, !onlyEqual,bonus) ;
            }
            finded = [firstIndex]; 
            return finded; //non ho trovato nulla 
        }else{
            grado++; 
            finded = [0];
            thisIndex=diceRolled.length-(grado-2);
            for (let index = (grado-1) ; index>1; index--) { 
                finded.push(diceRolled.length-index);
            } 
            return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus) ;
        }
    }
    index=(grado-1);
    finded[index]=thisIndex;
    total=0;
    for (let index = 0; index < finded.length; index++) {
        const element = finded[index]; 
        total=total+diceRolled[element] +bonus; 
    }   
    if(onlyEqual && total ==success){  
        return finded;
    } 
    if(!onlyEqual && total >=success){  
        return finded;
    } 

    thisIndex--; 
    return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus) ;
};
var findCouple= function(consume, result, success, total,diceTrash,bonus,language){  
    if(consume.length===0){
        if(language=='ita'){
            result.push("\n "+boldTAG+property.label('raises'+language)+total+""+boldTAG+"");
            result.push("\n "+property.label('trashdice'+language)+diceTrash);
        }
        else{
            result.push("\n "+boldTAG+property.label('raises'+language)+total+""+boldTAG+"");
            result.push("\n "+property.label('trashdice'+language)+diceTrash);
        }
        return result;
    }else{
 
        var sum= 0;
        var stringResult ='';
        var pack =ricursiveFindSuccess(consume, 0, (consume.length-1),  [], success,1,true,bonus); 
        if(!pack && consume){    
            if(bonus!==0){
                stringResult=consume[0]+"+"+bonus;
            }else{
                stringResult=consume[0]; 
            }
            consume.splice(0, 1);
            sum=stringResult+bonus;
        }else{   
            pack.sort(function(a, b){return a-b}); 
            pack.forEach(toremove => {
                if(bonus!==0){
                    stringResult=stringResult+" "+consume[toremove]+"+"+bonus+" ";
                }else{
                    stringResult=stringResult+" "+consume[toremove]+" "; 
                };  
                sum=sum+consume[toremove]+bonus;
            });
            for (let index = (pack.length-1); index>=0 ; index--) {
                const element = pack[index];
                consume.splice(element, 1); 
                
            } 
        }
        if(sum>=success ){
            result.push(""+"["+stringResult+"]"+""); 
            total=total+1;
        }else{
            result.push(""+barratoTAG+"["+stringResult+"]"+barratoTAG+""); 
            diceTrash=diceTrash+1;
        } 
 
        return findCouple(consume, result, success, total, diceTrash, bonus, language);
    } 
};

var rollDice = function(diceRolled,totalDice, esplosioni ){ 
	var currentIndex = 0; 
    while (0 < totalDice) { 
        randomIndex = Math.floor(Math.random() * 10)+1; 
        diceRolled[currentIndex] = randomIndex; 
        currentIndex++;
        if(!esplosioni || randomIndex!==10){
            totalDice --;
        }
    } 
    diceRolled.sort(function(a, b){return b-a});
    return diceRolled;
};

module.exports = { 
    roll: function(numberDice, soglia, bonus, villan,esplosioni, language) { 
        
        
        var totalDice = numberDice;
        var villanDice = 0;
        var poolvillanDice = 0;
        var message = '';
		var diceRolled = [];
		var villanRolled = [];
		var poolvillanRolled = [];
		var result = []; 

		if(numberDice<='0' || isNaN(numberDice)){ 
            message = property.label('funny'+language);
            return message;

		} 

        if(villan>0){
            villanDice = villan-1;
            totalDice = totalDice - villanDice;
            if(totalDice<0){
                villanDice = numberDice;
                totalDice = 0;
            }
            poolvillanDice = villan;
        }  
 
        diceRolled = rollDice(diceRolled, totalDice,esplosioni);

        if(villan>0){
            villanRolled = rollDice(villanRolled, villanDice, esplosioni);
            poolvillanRolled = rollDice(poolvillanRolled, poolvillanDice, esplosioni);
            villanRolled.forEach(vilDice => {
                diceRolled.push(vilDice);
            });
            diceRolled.sort(function(a, b){return b-a});
        }
        
        result=findCouple(diceRolled,result,soglia,0,0,bonus, language);  
        
        if(villan>0){
            for (let index = 0; index < result.length-2; index++) {
                const element = result[index]; 
                
                for (let index2 = 0; index2 < villanRolled.length; index2++) {
                    const vilDice = villanRolled[index2];
                    var compare = " "+vilDice+" ";
                    if(element.includes(compare) ){
                        var firstindex = element.indexOf(compare);
                        var lastindex =  firstindex+compare.length; 
                        var result2 = element.slice(0, firstindex) + italicTAG+ underlineTAG +boldTAG+compare;
                        result2 = result2 +boldTAG+ underlineTAG+italicTAG + element.slice(lastindex);
                        result[index]= result2;  
                        villanRolled.splice(index2, 1); 
                        break;
                    }
                    
                } 
            }
            if(villan>0){
                var result2=[];
                result2 = findCouple(poolvillanRolled,result2,1,0,0,bonus, language); 
                var result3 =[];
                for (let index = 0; index < result2.length-2; index++) {
                    var element=result2[index]; 
                    result3.push( italicTAG+ underlineTAG +boldTAG+element+boldTAG+ underlineTAG+italicTAG)
                } 
                if(language=='ita'){  
                    return property.label('result'+language)+result+",\n "
                    +italicTAG+ underlineTAG +property.label('villaindice'+language)+ underlineTAG+italicTAG+" "+result3;
                }
                else{
                    return property.label('result'+language)+result+",\n "
                    +italicTAG+ underlineTAG +property.label('villaindice'+language)+ underlineTAG+italicTAG+" "+result3; 
                }
            }
        }

        if(language=='ita'){
            return property.label('result'+language)+result; 
        }
        else{
            return property.label('result'+language)+result; 
        }
    }
};
 
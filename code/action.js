/** ESEGUE I COMANDI */  

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
var findCoupleAction= function(consume, success,bonus,rturn){   
    if(consume.length===0){    
        return rturn;
    }else{
        var sum= 0;
        var jsonResult =[];
        var dice = null;
        var pack =ricursiveFindSuccess(consume, 0, (consume.length-1),  [], success,1,true,bonus); 
        if(!pack && consume){     
            rturn.discarded.push(dice);
            jsonResult.push({ dice:consume[0], bonus: bonus });  
            consume.splice(0, 1);
            sum=stringResult+bonus;
            if(sum>=success ){
                rturn.consumed.push(dice);
            }else{
                rturn.discarded.push(dice);
            }
        }else{   
            pack.sort(function(a, b){return a-b}); 
            pack.forEach(toremove => {
                var consumed = consume[toremove];
                rturn.consumed.push(consumed);
                jsonResult.push({ dice:consumed, bonus: bonus }); 
                sum=sum+consumed+bonus;
                if(pack.length>1 || (consumed+bonus)>=success ){ 
                    rturn.consumed.push(consumed);
                }else{
                    rturn.discarded.push(consumed); 
                }
                
            });
            for (let index = (pack.length-1); index>=0 ; index--) {
                const element = pack[index];
                consume.splice(element, 1); 
            } 
        }  
        if(sum>=success ){
            rturn.result.push(jsonResult); 
            rturn.raises=rturn.raises+1;  
        }else{ 
            rturn.discardedResult.push(jsonResult); 
            rturn.trashdice=rturn.trashdice+1;  
        } 
 
        return findCoupleAction(consume, success, bonus,rturn);
    } 
};
var findCouple = function(consume,success, bonus){
    var rturn = { 
        raises:0,
        trashdice:0,
        discarded: [],
        consumed: [],
        discardedResult : [],
        result : []
    } 
    if(consume.length===0){
        return rturn;
    }
    return findCoupleAction(consume, success,  bonus, rturn);
}

var rollDice = function(diceRolled,totalDice, esplosioni ){ 
    if(totalDice===0){
        return [];
    }
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

var tagResult = function(results, dices){  
    for (let index = 0; index < results.length; index++) {
        const element = results[index]; 
        element.forEach(dice => { 
            for (let index2 = 0; index2 < dices.length; index2++) {
                const vilDice = dices[index2]; 
                if(vilDice === dice.dice ){
                    dice.vile = true;
                    dices.splice(index2, 1); 
                    break;
                } 
            } 
        });
    }  
    return results;
}
module.exports = { 
    roll: function(numberDice, soglia, bonus, vile,esplosioni) { 
        
        
        var totalDice = numberDice;
        var vileDice = 0;
        var poolvileDice = 0; 
		var diceRolled = [];
		var vileRolled = [];
		var poolvileRolled = []; 

        if(vile>0){
            vileDice = vile-1;
            totalDice = totalDice - vileDice;
            if(totalDice<0){
                vileDice = numberDice;
                totalDice = 0;
            }
            poolvileDice = vile;
            vileRolled = rollDice(vileRolled, vileDice, esplosioni); 
            poolvileRolled = rollDice(poolvileRolled, poolvileDice, esplosioni);
        }  
 
        diceRolled = rollDice(diceRolled, totalDice,esplosioni); 
        var rtrn=findCouple(diceRolled,soglia,bonus);  
        
        if(vile>0){ 
            var anotherTier = rtrn.discarded; 
            vileRolled.forEach(vilDice => {
                anotherTier.push(vilDice);
            });   
            var rtrnVile=findCouple( anotherTier,soglia,bonus);   
            
 
            var addictionalResult = tagResult(rtrnVile.result,vileRolled);
            addictionalResult.forEach(element => {
                rtrn.result.push(element);
            });
            rtrn.discardedResult = tagResult(rtrnVile.discardedResult,vileRolled);
            rtrn.raises=rtrn.raises+rtrnVile.raises;
            rtrn.trashdice=rtrnVile.trashdice;
            
            rtrn.corruption = 0;
            rtrnVile.result.forEach(element => { 
                element.forEach(dice => { 
                    if(dice.vile){
                        if(rtrn.corruption===0){
                            rtrn.corruption=1;
                        }else{ 
                            rtrn.corruption+=rtrn.corruption;
                        }
                    }
                });
            });
            rtrn.vileDice =[];
            poolvileRolled.forEach(element => {
                rtrn.vileDice.push([{ dice: element, bonus: bonus, vile: true }]);  
            });
                
                
        }
        return rtrn;  
    }
};
 
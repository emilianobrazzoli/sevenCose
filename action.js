

/*
var diceRolled=[  5,4,4,2,2,2,1];
//var diceRolled=[  10 , 9 ,1 , 7, 4 , 7,6, 4 , 2 , 1];
//var diceRolled=[11 ,  10 , 10 , 9 ,1 ,  9 ,2,  6, 1 ,  1 ]
diceRolled.sort(function(a, b){return b-a});
var consume = diceRolled;
var result=[];
console.log("originale:"+diceRolled+"\n");
result=findCouple(consume,result,10,0,0);
console.log(" risultato:"+result+"\n"); */
var ricursiveFindSuccess= function(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus){
    if(finded.length===0){
        if(diceRolled[firstIndex] +bonus>=success){ //il primo va bene
            finded = [firstIndex];
            //console.log("first find ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
            return finded; 
        }else{//non trovo subito all'inizio
            grado = 2;
            total=diceRolled[firstIndex];
            thisIndex=diceRolled.length-1;
            finded = [firstIndex];
            finded.push(0);
            //console.log("first ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
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
                //console.log("first ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
                return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, !onlyEqual,bonus) ;
            }
            finded = [firstIndex];
            //console.log("last ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
            return finded; //non ho trovato nulla 
        }else{
            grado++; 
            finded = [0];
            thisIndex=diceRolled.length-(grado-2);
            for (let index = (grado-1) ; index>1; index--) { 
                finded.push(diceRolled.length-index);
            }
            //console.log("add grade ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
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
        //console.log("find ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
        return finded;
    } 
    if(!onlyEqual && total >=success){ 
        //console.log("find ["+diceRolled+"]   "+  firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
        return finded;
    } 

    thisIndex--;
    //console.log("next ["+diceRolled+"]   "+ firstIndex+" "+thisIndex+" ["+ finded+"] "+ success+" "+ grado+""); 
    return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual,bonus) ;
};
var findCouple= function(consume, result, success, total,diceTrash,bonus,lenguage){ 
    //console.log("findCouple: "+consume+"; "+ result+"\n"); 
    if(consume.length===0){
        if(lenguage=='ita'){
            result.push("\n **Incrementi: "+total+"**");
            result.push("\n Dadi scartati: "+diceTrash);
        }
        else{
            result.push("\n **Raises: "+total+"**");
            result.push("\n Discarded dice: "+diceTrash);
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
            //console.log("xxxxx: "+consume+"; "+ pack+"\n"); 
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
            result.push("**["+stringResult+"]**"); 
            total=total+1;
        }else{
            result.push("~~["+stringResult+"]~~"); 
            diceTrash=diceTrash+1;
        } 
 
        return findCouple(consume, result, success, total, diceTrash, bonus);
    } 
} 
module.exports = { 
    roll: function(numberDice, soglia, bonus,esplosioni, lenguage) { 
        
		if(numberDice<='0' || isNaN(numberDice)){
            if(lenguage=='ita'){
			    message =  'Molto spiritoso';
            }
            else{
			    message =  'Very funny';
            }
            return message;
		}
        //console.log('Tirando '+numberDice+ ' dadi');
        var totalDice = numberDice;
        var message = '';
		var diceRolled = [];
		var result = [];
		var currentIndex = 0;
        var success = 10;
        var finded
        // While there remain elements to shuffle...
        while (0 < totalDice) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * 10)+1;
            //console.log('Ancora '+totalDice+ ' dadi da tirare');
			diceRolled[currentIndex] = randomIndex; 
            currentIndex++;
            if(!esplosioni || randomIndex!==10){
                totalDice --;
            }
        } 
        diceRolled.sort(function(a, b){return b-a});
 
        result=findCouple(diceRolled,result,soglia,0,0,bonus, lenguage);  

        if(lenguage=='ita'){
            return " Risultati: "+result; 
        }
        else{
            return " Result: "+result; 
        }
    }
};
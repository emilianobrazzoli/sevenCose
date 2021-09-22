

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
var ricursiveFindSuccess= function(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual){
    if(finded.length===0){
        if(diceRolled[firstIndex] >=success){ //il primo va bene
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
            return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual) ;
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
                return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, !onlyEqual) ;
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
            return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual) ;
        }
    }
    index=(grado-1);
    finded[index]=thisIndex;
    total=0;
    for (let index = 0; index < finded.length; index++) {
        const element = finded[index]; 
        total=total+diceRolled[element]; 
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
    return ricursiveFindSuccess(diceRolled, firstIndex, thisIndex, finded, success, grado, onlyEqual) ;
};
var findCouple= function(consume, result, success, total,diceTrash){ 
    //console.log("findCouple: "+consume+"; "+ result+"\n"); 
    if(consume.length===0){
        result.push("\n incrementi:"+total);
        result.push("\n dadi scartati:"+diceTrash);
        return result;
    }else{
 
        var sum= 0;
        var stringResult ='';
        var pack =ricursiveFindSuccess(consume, 0, (consume.length-1),  [], success,1,true); 
        if(!pack && consume){   
            stringResult=consume[0];
            consume.splice(0, 1);
            sum=stringResult;
        }else{   
            pack.sort(function(a, b){return a-b});
            //console.log("xxxxx: "+consume+"; "+ pack+"\n"); 
            pack.forEach(toremove => {
                stringResult=stringResult+" "+consume[toremove]+" ";  
                sum=sum+consume[toremove];
            });
            for (let index = (pack.length-1); index>=0 ; index--) {
                const element = pack[index];
                consume.splice(element, 1); 
                
            } 
        }
        if(sum>=success ){
            total=total+1;
        }else{
            diceTrash=diceTrash+1;
        }
        result.push("["+stringResult+"]"); 
        return findCouple(consume, result, success, total, diceTrash);
    } 
} 
module.exports = {
    roll: function(numberDice) { 
        
		if(numberDice<='0' || isNaN(numberDice)){
			message =  'Molto spiritoso';
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
            randomIndex = Math.floor(Math.random() * numberDice)+1;
            totalDice --;
            //console.log('Ancora '+totalDice+ ' dadi da tirare');
			diceRolled[currentIndex] = randomIndex;
			currentIndex++;
        } 
        diceRolled.sort(function(a, b){return b-a});
 
        result=findCouple(diceRolled,result,10,0,0);  

        return "Risultati: "+result; 
    }
};
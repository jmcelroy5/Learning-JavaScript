
function luhn(num) {
   var reverse = num.split('').reverse();
   for (var i = 0; i < reverse.length; i++) {
     	reverse[i] = parseInt(reverse[i]);
   }
	var s1 = 0;
    var s2 = 0;
 	for (var i = 0; i < reverse.length; i += 2){
        s1 += reverse[i]; 
	}
	for (var i = 1 ; i < reverse.length ; i += 2) {
		var dubbel = reverse[i] * 2;
		if (dubbel > 9) {
			var digitArray = dubbel.toString().split('');
			dubbel = parseInt(digitArray[0]) + parseInt(digitArray[1]);
		}
        s2 += dubbel;
	}    
	var finalSum = s1 + s2;
	if (finalSum % 10 === 0){
	    var isValid = true;
	}
    else {
    	var isValid = false;
    }
	return isValid;
}




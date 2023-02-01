export class dataHelper {
    randomizeString(length){
        var randomstring = require("randomstring");
        return randomstring.generate({
            length: length,
            charset: 'alphabetic'
        });
    }

    formatNumber(num){
        const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
        const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

        return addCommas(removeNonNumeric(num))
    }
}
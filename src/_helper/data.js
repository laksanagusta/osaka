export class dataHelper {
    randomizeString(length){
        var randomstring = require("randomstring");
        return randomstring.generate({
            length: length,
            charset: 'alphabetic'
        });
    }
}
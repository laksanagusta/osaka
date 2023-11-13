import { config, showError, showSuccess } from "../utils";

export class userServices {
    signIn(reqBody){
        return fetch(config.url+'/api/v1/users/login', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: reqBody,
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code != 200){
                showError(res.meta.message)
            } 
            else{
                return res
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }
}
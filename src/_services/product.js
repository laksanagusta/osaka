import { config, showError, showSuccess } from "../utils";

export class productServices {
    getProductByCode(code, user){
        return fetch(config.url+'/api/v1/products/code/'+code, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            }
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                showSuccess(res.meta.message)
                const data = res.data
                return data;
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    saveProduct(reqBody, user, productId){
        fetch(config.url+'/api/v1/products/'+productId, {
            method: 'PUT',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            },
            body: reqBody,
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code !== 200){
                showError(res.data.message)
            } 
            else{
                showSuccess(res.meta.message)
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    getProducts(user){
        return fetch(config.url+'/api/v1/products?limit=8&page=1', {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVudGlzQGdtYWlsLmNvbSIsInVzZXJfaWQiOjF9.nRk_vimVr98VmmyEvcj_O99Aj2dUA7CVbDZ_2wFBRGE'
            }
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                showSuccess(res.meta.message)
                const data = res.data
                return data;
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }
}
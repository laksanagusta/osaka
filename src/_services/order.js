import { config, showError, showSuccess } from "../utils";

export class orderServices {
    getOrders(user){
        return fetch(config.url+'/api/v1/orders?q=&page_size=20&page=0', {
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
                return res.data
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    saveOrder(reqBody, user){
        console.log(reqBody);
        return fetch(config.url+'/api/v1/order-basket/place', {
            method: 'POST',
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
                showError(res.meta.message)
            } 
            else{
                showSuccess(res.meta.message)
                return res.data;
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    getOrderById(user, orderId){
        return fetch(config.url+'/api/v1/orders/'+orderId, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.aiQWbjuU1RCDjxlyTAM0wI_IcIke3CsmBFmVsuZlh4w'
            }
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                return res.data
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }
}
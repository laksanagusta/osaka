import { config, showError, showSuccess } from "../utils";

export class cartServices {
    getActiveCart(user){
        return fetch(config.url+'/api/v1/carts/active', {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            }
        })        
        .then(response => response.json())
        .then(res => {
                return res
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    createEmptyCart(user){
        return fetch(config.url+'/api/v1/carts', {
            method: 'POST',
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
                return res
            }  
        })
        .catch((error) => {
            showError(error.message)
        })
    }

    addToCart(product, cartId, user){
        return fetch(config.url+'/api/v1/cart-items', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            },
            body: JSON.stringify({
                qty: 1,
                unitPrice: product.unitPrice,
                note: "test",
                cartId: cartId,
                productId: product.id,
                attributeItem:[]
            })
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code !== 200){
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

    updateCartItem(qty, cartItemId, user){
        return fetch(config.url+'/api/v1/cart-items/' + cartItemId, {
            method: 'PUT',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            },
            body: JSON.stringify({
                qty: qty,
                note: "em",
                attributeItem:[]
            })
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
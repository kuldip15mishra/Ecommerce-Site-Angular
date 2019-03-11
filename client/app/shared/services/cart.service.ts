import {AuthService }from './auth.service'; 
import {AuthConfig }from 'angular2-jwt'; 
import {Settings }from './../../settings'; 
import {Router }from '@angular/router'; 
import {CrudService }from './crud.service'; 
import {Injectable }from '@angular/core'; 
import {URLSearchParams }from '@angular/http'; 
import * as _ from 'lodash'; 

@Injectable()
export class CartService {
   public items:Array < any >  = []; 
    skuArray:Array < string >  = []; 
    variantsArray:Array < string >  = []; 
    totalWeight:number = 0; 
    clearCart:boolean = false; 
    cartName:string = 'SalientInk'; 
    constructor(private crud:CrudService, private router:Router, private auth:AuthService) {
        this.loadItems(); 
    }
    checkout(method:string, items:string[], params:any, clearCart:boolean) {
        params.exchange_rate = Settings.currency.exchange_rate; 
        if ( ! params.exchange_rate || isNaN(params.exchange_rate) || params.exchange_rate === '')params.exchange_rate = 1; 
        if ( ! params.couponAmount || isNaN(params.couponAmount) || params.couponAmount === '')params.couponAmount = 0; 
        params.currency_code = Settings.currency.code; 
        params.paypal_currency = Settings.currency.paypal; 
        params.email = this.auth.currentUser.email; 
        params.uid = this.auth.currentUser._id; 
        params.recipient_name = (params.name === '')?this.auth.currentUser.name:params.name; 
        switch (method) {
            case "PayPal":
                this.checkoutPayPal(params, clearCart); 
                break; 
            case "COD":
                this.checkoutCOD(params, clearCart); 
                break; 
            default:
                console.log("Unknown checkout service: " + method); 
                break; 
        }
    }

    checkoutPayPal(params:any, clearCart:boolean) {
        let data =  {
            cmd:"_cart", 
            business:params.merchantID, 
            upload:"1", 
            rm:"2", 
            charset:"utf-8", 
            data:this.items, 
            options:params
        }; 
        let form = $('<form/></form>'); 
        form.attr("id", "paypalForm"); 
        form.attr("action", "/api/pay/paypal"); 
        form.attr("method", "GET"); 
        form.attr("style", "display:none;"); 
        this.addFormFields(form, data); 
        $("body").append(form); 
        // this.clearCart = clearCart == null || clearCart;
        if (clearCart)
            this.clearItems(); 
        form.submit(); 
        form.remove(); 
    }
    checkoutCOD = function (parms:any, clearCart:boolean) {
       
        var data = this.items; 
        var total = Math.round((this.getTotalPrice() - parms.couponAmount) * parms.exchange_rate * 100)/100; 
        var subtotal = Math.round((this.getTotalPrice() - parms.couponAmount) * parms.exchange_rate * 100)/100; 
        var items = []; 
        for (var k = 0; k < data.length; k++) {
            var i = data[k]; 
            items.push( {sku:i.sku, name:i.name, url:i.image, description:i.slug, price:Math.round(i.price * parms.exchange_rate * 100)/100, quantity:i.quantity, currency:parms.currency_code }); 
        }
        if (parms.discount > 0)
            items.push( {sku:'#', name:'Coupon Discount', url:'-', description:'-', price: - Math.round(parms.discount * parms.exchange_rate * 100)/100, quantity:1, currency:parms.currency_code }); 
        var orderDetails =  {
            uid:parms.uid, 
            email:parms.email, 
            phone:parms.phone, 
            address:parms.address, 
            payment: {state:'Pending', method:'COD'}, 
            amount: {total:total, currency:parms.currency_code, exchange_rate:parms.exchange_rate, details: {shipping:Math.round(parms.shipping * 100)/100, subtotal:subtotal }}, 
            items:items, 
            status:'Payment Pending'
        }
        // When order.status is null, the client will replace with the Array[0] of order status at appConfig page
        this.crud.post('orders', orderDetails, true, true).subscribe((data:any) =>  {
            if(this.isPrivateVendorUser()){
               this.addCartItemsTOOrderHisotry(parms,this.calculateCategoryWise());
            }
            if (clearCart)
                this.clearItems(); 
            this.router.navigateByUrl('/admin/my-orders'); 
        }); 
    }
    isPrivateVendorUser(){
        if(this.auth.currentUser.role === 'vendorprivateuser'){
            return true;
        }else{
            return false;
        }
    }
    addCartItemsTOOrderHisotry(params,cateorywise){
    
        var orderDetails =  {
            uid:params.uid, 
            email:params.email, 
            orderNo:'', 
            comment:'',
            category_wise_orders :cateorywise, 
            status:'Payment Completed'
        }
        this.crud.post('orderhistory', orderDetails, true, true).subscribe((data:any) =>  {
            
        }); 
    }

    calculateCategoryWise() {

        var data = this.items; 
        var items = []; 
        var result = []; 
        data.reduce(function (res, value) {
    if ( ! res[value.category]) {
        res[value.category] =  {
            quantity:0, 
            Id:value.category
        }; 
        result.push(res[value.category])
    }
            res[value.category].quantity += value.quantity
        return res; 
},  {}); 

return result;
    }

    // check out using Google Wallet
    // for details see:
    // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
    // developers.google.com/checkout/developer/interactive_demo
    checkoutGoogle(parms:any, clearCart:boolean) {

        // global data
        var data =  {}; 

        // item data
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i]; 
            var ctr = i + 1; 
            data["item_name_" + ctr] = item.sku; 
            data["item_description_" + ctr] = item.name; 
            data["item_price_" + ctr] = item.price.toFixed(2); 
            data["item_quantity_" + ctr] = item.quantity; 
            data["item_merchant_id_" + ctr] = parms.merchantID; 
        }

        // build form
        var form = $('<form/></form>'); 
        // NOTE: in production projects, use the checkout.google url below;
        // for debugging/testing, use the sandbox.google url instead.
        //form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantID);
        form.attr("action", "https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/" + parms.merchantID);
form.attr("method", "POST"); 
        form.attr("style", "display:none;"); 
        this.addFormFields(form, data); 
        if ( ! parms.options) {parms.options =  {}; }
        this.addFormFields(form, parms.options); 
        $("body").append(form); 

        // submit form
        this.clearCart = clearCart == null || clearCart; 
        form.submit(); 
        form.remove(); 
    }

    addFormFields(form:any, data:any) {
        if (data !== null) {
            $.each(data, function (name, value) {
                if (value !== null) {
                    let input = $('<input></input>').attr('type', 'hidden').attr('name', name).val(JSON.stringify(value)); 
                    form.append(input); 
                }
            }); 
        }
    }

    toNumber(value:any) {
        value = value * 1; 
        return isNaN(value)?0:value; 
    }
    loadItems() {
        let items = localStorage !== null?localStorage[this.cartName + '_items']:null; 
        if (items !== null && JSON !== null) {
            try {
                items = JSON.parse(items); 
                for (let i = 0; i < items.length; i++) {
                    let item = items[i]; 
                    if (item.sku !== null && item.name !== null && item.price !== null) {
                        this.items.push(item); 
                        this.skuArray.push(item.sku); 
                        this.variantsArray.push(item.vid); 
                        // this.totalWeight = item.weight;
                    }
                }
            }
            catch (err) {
                // ignore errors while loading...
            }
        }
    }

    // save items to local storage
    saveItems() {
        if (localStorage !== null && JSON !== null) {
            localStorage[this.cartName + '_items'] = JSON.stringify(this.items); 
        }
    }

    // adds an item to the cart
    addItem(product:any, quantity:number) {
        quantity = this.toNumber(quantity); 
        if (quantity !== 0) {
            // update quantity for existing item
            let found = false; 
            for (let i = 0; i < this.items.length &&  ! found; i++) {
                let item = this.items[i]; 
                if (item.sku === product.sku && item.vid === product.vid ) {
                    // if(product.isallocated){
                         item.isallocatedquantity =this.toNumber(product.isallocatedquantity);
                    // }
                    found = true; 
                    item.quantity = this.toNumber(this.toNumber(item.quantity) + quantity);
                   item.discountamount= product.discountamount;
                    if (item.weight == null) {item.weight = 0; }
                    item.slug = product.slug
                    if (item.quantity <= 0) {
                        this.items.splice(i, 1); 
                        this.skuArray.splice(i, 1); 
                        this.variantsArray.splice(i, 1); 
                    }

                    
                }
            }

            // new item, add now
            if ( ! found ) {
                let itm = product; 
                this.items.push(itm); 
                this.skuArray.push(itm.sku); 
                this.variantsArray.push(itm.vid); 
            }

            // save changes
            this.saveItems(); 
        }
    }

    // get the total price for all items currently in the cart
    getBestShipper() {
        // let params = new URLSearchParams();
        // params.set('weight', this.getTotalWeight().toString());
        // params.set('cartValue', this.getTotalPrice().toString());
        return this.crud.get('shippings/best',  {weight:this.getTotalWeight().toString(), cartValue:this.getTotalPrice().toString()}); 
    }

    // get the total price for all items currently in the cart
    getTotalWeight() {
        var totalWeight = 0; 
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i]; 
            
            totalWeight += (this.toNumber(item.quantity * item.weight) ); 
        }
        return totalWeight; 
    }

    // get the total price for all items currently in the cart
    getTotalPrice() {
        var total = 0; 
        for (var i = 0; i < this.items.length; i++) {
            var item :any= this.items[i]; 
            if(item.isallocatedquantity){
                var discount =item.isallocatedquantity * item.price;
                total += (this.toNumber((item.quantity * item.price)-discount));}
                else{
                    total += (this.toNumber((item.quantity * item.price)));
                }
             
        }
        return total; 
    }
    checkCart(id:string, vid:string) {// Returns false when there is item in cart
if ( ! _.includes(this.skuArray, id) ||  ! _.includes(this.variantsArray, vid)) {
            return true; 
        }else {
            return false; 
        }
    }
    getQuantity(sku:string, vid:string) {// Get quantity based on the combination of product_id and variant_id
for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].sku === sku && this.items[i].vid === vid) {
                return this.items[i].quantity; 
            }
        }
    }

    // get the total price for all items currently in the cart
    getTotalCount(sku?:any) {
        var count = 0; 
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i]; 
            if (sku === undefined || item.sku === sku) {
                count += this.toNumber(item.quantity); 
            }
        }
        return count; 
    }

    // clear the cart
    clearItems() {
        this.items = []; 
        this.skuArray = []; 
        this.variantsArray = []; 
        this.saveItems(); 
    }

}
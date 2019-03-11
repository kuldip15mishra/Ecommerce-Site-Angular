import {CartService }from './../../shared/services/cart.service';
import {AuthService }from './../../shared/services/auth.service';
import {Component, OnInit, Input }from '@angular/core';
import {CrudService }from './../../shared/services/crud.service';
@Component( {
  selector:'cart-buttons',
  templateUrl:'./cart-buttons.component.html',
  styleUrls:['./cart-buttons.component.css']
})
export class CartButtonsComponent implements OnInit {

  currentAllocatedValue:number = 0;
  currentProductInContext :any;
  currentVairant:any;
  currentI:any;
  currentParentID :any;
   discountamount =0;
  constructor(private crud:CrudService, protected cart:CartService, private auth:AuthService) {}
  @Input()product:any;
  @Input()variant:any;
  @Input()parentCategoryID:any;
  ngOnInit() {
  }

  isCheckPrivateStoreAccess() {
    if (this.auth.currentUser && this.auth.currentUser.role && this.auth.currentUser.role === 'vendorprivateuser') {
      return true;
    }else {
      return false;
    }
  }

  getParentCategoryID(id){
     
   return  this.crud.post('categories/getParentCategoryID',{id :id},true)
  }

  
  CalculateAllocatedTaken(categoryWiseOrder, category) {
    if(categoryWiseOrder ) {
      let currentcategoryWiseSum = this.calculateSum(categoryWiseOrder)
    this.fetchAllocatedQuntityForCategory(currentcategoryWiseSum, category);
    }else{
      //let currentcategoryWiseSum = this.cart.items.length;
      this.fetchAllocatedQuntityForCategory(0, category);
    }
  }

  findCurrentAllocatedValueTakeFromCart(categoryID){
    let count = this.cart.items.filter(item=>{
      return item.category === categoryID;
    });
 var totalQuantity =0;
    if(count && count.length >0)
      { 
        count.forEach(item=>{
          totalQuantity +=(item.quantity +1);
        })
        
        return  totalQuantity }
      else{
        return 1;
      }
  }
  fetchAllocatedQuntityForCategory(currentcateegoryWiseSum, category) {

    if(!this.parentCategoryID ){
     this.getParentCategoryID(category).subscribe(res=>{
    
      if(res && res.length>0) {
        let currentAllocatedValue = this.findCurrentAllocatedValueTakeFromCart(category);
              this.discountPriceOnBasisofPreviousPurchaseHisotry(res[0].allocatedVal, currentAllocatedValue);
        
      }
  
   });
  }else{
    this.crud.post('categories/find',  {id:this.parentCategoryID}, true, true).subscribe(data =>  {
      if (data && data.length > 0) {
      if(!currentcateegoryWiseSum){
        let currentAllocatedValue = this.findCurrentAllocatedValueTakeFromCart(category);
        this.discountPriceOnBasisofPreviousPurchaseHisotry(data[0].allocatedVal, currentAllocatedValue);
      }else{
        this.discountPriceOnBasisofPreviousPurchaseHisotry(data[0].allocatedVal, currentcateegoryWiseSum);
      }
          
      }
     });
  }
    
  }

  discountPriceOnBasisofPreviousPurchaseHisotry(currentAllocatedVal, CurrentUsedAllocatedQuantity) {
    let price=this.currentVairant.price;
    let isallocatedquantity =0;
    let isallocated=false;
    this.discountamount =0;
    // if (currentAllocatedVal > CurrentUsedAllocatedQuantity && this.currentI >0) {
    //      //price=0;
    //      isallocatedquantity =currentAllocatedVal;
    //      this.discountamount=CurrentUsedAllocatedQuantity === 0? 1*price : (CurrentUsedAllocatedQuantity +1)*price
    //   }else if(currentAllocatedVal <= CurrentUsedAllocatedQuantity &&  this.currentI >0){
    //     this.discountamount= currentAllocatedVal*price
 
    //   }else if(currentAllocatedVal > CurrentUsedAllocatedQuantity && this.currentI === -1){
    //     isallocatedquantity =currentAllocatedVal;
    //     this.discountamount=CurrentUsedAllocatedQuantity === 0? 1*price *-1 : (CurrentUsedAllocatedQuantity +1)*price *-1

    //   }else if(currentAllocatedVal <= CurrentUsedAllocatedQuantity &&  this.currentI ===-1){
    //     this.discountamount= currentAllocatedVal*price*-1
    //   }

    if (currentAllocatedVal >= CurrentUsedAllocatedQuantity) {

     
      this.discountamount = price;
      isallocated=true;
      isallocatedquantity =CurrentUsedAllocatedQuantity;
      }else if(currentAllocatedVal < CurrentUsedAllocatedQuantity){
        this.discountamount = price;
      isallocated=true;
      isallocatedquantity =currentAllocatedVal;
      }

         //this.discountamount=CurrentUsedAllocatedQuantity*price
      this.cart.addItem( {isallocatedquantity :isallocatedquantity ,discountamount :this.discountamount,isallocated :isallocated, sku:this.currentProductInContext._id, name:this.currentProductInContext.name, slug:this.currentProductInContext.slug, mrp:this.currentVairant.mrp, price:price, quantity:1, image:this.currentVairant.image, category:this.currentProductInContext.category, size:this.currentVairant.size, weight:this.currentVairant.weight, vid:this.currentVairant._id }, this.currentI);

  }

  calculateSum(data) {
    let total = 0;
    if (data && data.length > 0) {
      var values = [];
    for(var k=0;k<data.length;k++){

    let category_wise_orders=data[k].category_wise_orders;
      for (var i = 0; i < category_wise_orders.length; ++i) {
        values.push(parseFloat(category_wise_orders[i].quantity));
    }
    total += values.reduce(function (previousValue, currentValue, index, array) {
        return previousValue + currentValue;
    });
    }
  }

    return total;
  }
  addItem(product:any, variant:any, i:number) {
    this.currentProductInContext=product;
    this.currentVairant=variant;
this.discountamount=0;
    if (variant) {
      i = i || 1;
      this.currentI=i;
      if ( ! this.isCheckPrivateStoreAccess()) {

        this.cart.addItem( {sku:product._id, name:product.name, slug:product.slug, mrp:variant.mrp, price:variant.price, quantity:1, image:variant.image, category:product.category, size:variant.size, weight:variant.weight, vid:variant._id }, i);
      }else {

        this.crud.post('orderhistory/find',  {id:this.auth.currentUser._id}, true, true).subscribe((data:any) =>  {
          //this.getParentCategoryID();
          if (data && data.length > 0) {
            this.CalculateAllocatedTaken(data, product.category);

          }else{
            this.CalculateAllocatedTaken(null, product.category);
          }
     });
           }

    }
  }
}

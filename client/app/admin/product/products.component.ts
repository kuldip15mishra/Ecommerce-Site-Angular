import {Router }from '@angular/router'; 
import {CrudHelper }from './../../shared/services/crud.helper'; 
import {MatSnackBar }from '@angular/material'; 
import {ModalService }from './../../modal/modal.service'; 
import {CrudService }from './../../shared/services/crud.service'; 
import {FormControl }from '@angular/forms'; 
import {Subscription }from 'rxjs'; 
import {Component, OnInit, Input }from '@angular/core'; 
import {product }from './product.fields'; 
import BaseCtrl from './../../base'; 
import {ActivatedRoute }from '@angular/router'; 
import {AuthService }from '../../shared/services/auth.service'; 
@Component( {
  selector:'salientink-products', 
  templateUrl:'./products.component.html'
})
export class ProductsComponent extends BaseCtrl implements OnInit {
  fields:Array < any > ; 
  no:any =  {}; 
  fie:Array < any > ; 
  title:string = 'Products'; 
  api:string = 'products/my'; 
  api2:string = 'products'; 
  showFilter:boolean = false; 
  data:any[] = []; 
  url:string; 
  loading:boolean = false; 
  busy:Subscription; 
  meta:any =  {}; 
  sort: {predicate:string, reverse:boolean }; 
  public filterText:string; 
  public filterInput = new FormControl(); 
  constructor(public crud:CrudService, private routesnap:ActivatedRoute, 
    public snack:MatSnackBar, private helper:CrudHelper, private route:Router, 
    public modal:ModalService, 
    private auth:AuthService
    ) {
    super(); 
    this.no =  {}; 
    this.fields = product.fields; 
  }

  ngOnInit() {
    this.flush(); 
   
    
    this.sort =  {predicate:null, reverse:false }; 
    this.url = this.route.url; 
    this.fie = this.helper.help(this.fields); 
    //this.getData( {sort:'-updatedAt'}); 
    this.fetchData(); 
    this.filterText = ""; 
    let typingTimer; 
    this.filterInput.valueChanges.subscribe(term =>  {
      clearTimeout(typingTimer); 
      let vm = this; 
      typingTimer = setTimeout(function () {
        vm.filterText = term; 
        vm.flush(); 
        vm.meta.search = term; 
        vm.getData( {search:term }); 
      }, 400); 
    }); 
  }

  change(type) {
    this.flush(); 
    this.loading = true; 
    this.getData( {type:type }); 
  }

  err(err) {
    this.snack.open(err, 'OK',  {duration:2000 }); 
  }

  fetchData() {
    if (this.isCheckPrivateStoreAccess()) {
      let body={
        parentID:this.auth.currentUser._id
      }
      this.crud.post('products/find',body, true).subscribe(res =>  {
        if (res) {
          this.data = res; 
        }
      }); 
    }else {
      this.getData( {sort:'-updatedAt'}); 
  }
  }
  
  isCheckPrivateStoreAccess() {
    if (this.auth.currentUser && this.auth.currentUser.role && this.auth.currentUser.role === 'privatevendor') {
      return true; 
    }else {
      return false; 
    }
  }
}


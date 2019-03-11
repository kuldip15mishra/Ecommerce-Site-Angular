import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.css']
})
export class MegamenuComponent implements OnInit {
  categories: Array<any>;
  user:any;
  vendorprivateuser:boolean=false;
  constructor(private auth: AuthService,private crud: CrudService, private snack: MatSnackBar) { }
  

  ngOnInit() {
    this.getCurrentuserId()
    // if(this.vendorprivateuser){
    //   this.crud.get('categories/allPrivateVendorCategories',{parentID : this.user.parentID}).subscribe(data => this.categories = data, err => this.handleErr);
     
  
    // }else{
    //   this.crud.get('categories').subscribe(data => this.categories = data, err => this.handleErr);
    // }
    
  }
  handleErr(err: any) {
    this.snack.open('Categories could not be loaded', 'OK', { duration: 2000 });
  }

  getCurrentuserId() {
    var self=this;
    this.auth.$currentUser.subscribe(res=>{
      if(res )
      {
        if(res.email === ''){
          self.user =this.auth.currentUser; 
        }else{
          self.user =res; 
        }
        
        self.checkIsPrivateVendor();
      
        if(this.vendorprivateuser){
          this.crud.get('categories/allPrivateVendorCategories',{parentID : this.user.parentID}).subscribe(data => this.categories = data, err => this.handleErr);
         
      
        }else{
          this.crud.get('categories').subscribe(data => this.categories = data, err => this.handleErr);
        }
      }
    })
           
          
             
  }

  checkIsPrivateVendor(){
    if(this.user && this.user.role === 'vendorprivateuser' || this.user.role === 'privatevendor' ){
      this.vendorprivateuser=true;
    }else{
      this.vendorprivateuser=false;
    }
  }
}

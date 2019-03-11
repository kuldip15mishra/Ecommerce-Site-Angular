import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
@Component({
  selector: 'subcategory-detail-component',
  templateUrl: 'subcategory.component.html',
  styleUrls: ['subcategory.component.scss']
})
export class SubCategoryComponent implements OnInit {
  product: any;
  users: any;
  cols: any;
  header: string;
  questions: any[];
  busy: Subscription;
  productForm: FormGroup;
  brands: Array<any>;
  categories: Array<any>;
  features: Array<any>;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, @Inject(FormBuilder) private _fb: FormBuilder, private snack: MatSnackBar,private auth: AuthService) {
    this.product = {};
  }

  
  ngOnInit() {
   
   this.fetchCategories();

    this.product = "";//this.route.snapshot.data['product']; // Comes from product.resolve.ts
   // let users = this.route.snapshot.data['users'];
   // let id = this.route.snapshot.params['id'];
    //this.header = (id === 'add' || id === 'new') ? "Add New Product" : "Edit Product - " + id;
    this.productForm = this._fb.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      description: ['', []],
  
      category: ['', []],
      active: ['', []],
      approved: ['', []],
      hot: ['', []],
      new: ['', []],
      sale: ['', []],
    
    });

   

    this.cols = [
      { field: 'productType', heading: 'Product Type', dataType: 'select', options: ['Individual', 'Company'] },
    ];
  }
  initFeature(a?: any) {
    return this._fb.group({ key: [a.key], val: [a.val] });
  }


  handleError(error) {
    this.snack.open(<any>error, 'OK', { duration: 2000 });
  }
  save(data: any) {
    if (!data) { return; }
  //   delete data['_id'];
   //  let result:any = this.categories.filter(x=>{ return x._id ===data.category});
  //  if(result && result.length >0){
  //    result[0].children.push(data)
  //  }
  data['_id']=data.category;
  delete data['category'];
      this.busy = this.crud.post('categories/addsubcategory', data,true).subscribe(res => this.router.navigateByUrl("/admin/subcategory"), err => this.snack.open(err, 'OK'));
     
  }

  changeSale(product: any) {
    this.save(product);
  };

  checkIsPrivateVendor(){
    if(this.auth.currentUser.role ==='privatevendor') 
    {return true;
    }else{
      return false;
    }
      
  }
  fetchCategories(){
    if(this.checkIsPrivateVendor()){
      this.crud.get('categories/allPrivateVendorCategories',{parentID : this.auth.currentUser._id}).subscribe(data =>  {this.categories = data; }); 
     }else{
      this.crud.get('categories/all').subscribe(data => this.categories = data, this.handleError);
     }
  }

}
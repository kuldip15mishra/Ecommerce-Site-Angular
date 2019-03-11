import { MatSnackBar } from '@angular/material';
import { CrudService } from './../../../shared/services/crud.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
@Component({
  selector: 'product-detail-component',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  users: any;
  cols: any;
  header: string;
  questions: any[];
  busy: Subscription;
  productForm: FormGroup;
  brands: Array<any>;
  categories: Array<any>;
  subcategories:Array<any>;
  features: Array<any>;
  constructor(private crud: CrudService, private route: ActivatedRoute, private router: Router, @Inject(FormBuilder) private _fb: FormBuilder, private snack: MatSnackBar,private auth: AuthService) {
    this.product = {};
  }

  
  ngOnInit() {
    this.crud.get('brands').subscribe(data => this.brands = data, error => this.snack.open(<any>error, 'OK', { duration: 2000 }));
   
   this.fetchCategories();
   
    
  
   //}
     this.crud.get('features').subscribe(data => this.features = data, this.handleError);
    this.product = this.route.snapshot.data['product']; // Comes from product.resolve.ts
    let users = this.route.snapshot.data['users'];
    let id = this.route.snapshot.params['id'];
    this.header = (id === 'add' || id === 'new') ? "Add New Product" : "Edit Product - " + id;
    this.productForm = this._fb.group({
      sku: [this.product.sku, [Validators.required]],
      name: [this.product.name, [Validators.required]],
      slug: [this.product.slug, [Validators.required]],
      description: [this.product.description, []],
      brand: [this.product.brand, []],
      category: [this.product.category, []],
      subcategory :['',[]],
      active: [this.product.active, []],
      approved: [this.product.approved, []],
      hot: [this.product.hot, []],
      new: [this.product.new, []],
      sale: [this.product.sale, []],
      variants: this._fb.array([]),
      features: this._fb.array([]),
      keyFeatures: this._fb.array([]),
    });

    this.addFeature(this.product.features);
    this.addVariant(this.product.variants);
    this.addKeyFeature(this.product.keyFeatures);

    this.cols = [
      { field: 'productType', heading: 'Product Type', dataType: 'select', options: ['Individual', 'Company'] },
    ];
  }
  initFeature(a?: any) {
    return this._fb.group({ key: [a.key], val: [a.val] });
  }
  getSubcategory(event){
    let filterCategories:any = this.categories.filter(x=>{return x._id === event.value});

      if(filterCategories && filterCategories.length >0 && filterCategories[0].children && filterCategories[0].children.length >0){

        this.subcategories = filterCategories[0].children;
      }
  }
  addFeature(a?: any) {
    const control = <FormArray>this.productForm.get('features');
    if (!a) {
      const addrCtrl = this.initFeature({});
      control.push(addrCtrl);
    } else {
      a.forEach(element => {
        const addrCtrl = this.initFeature(element);
        control.push(addrCtrl);
      });
    }
  }
  initVariant(a?: any) {
    return this._fb.group({ size: [a.size], weight: [a.weight], mrp: [a.mrp], price: [a.price], image: [a.image] });
  }

  addVariant(a?: any) {
    const control = <FormArray>this.productForm.get('variants');
    if (!a) {
      const addrCtrl = this.initVariant({});
      control.push(addrCtrl);
    } else {
      a.forEach(element => {
        const addrCtrl = this.initVariant(element);
        control.push(addrCtrl);
      });
    }
  }

  addKeyFeature(a?: any) {
    const control = <FormArray>this.productForm.get('keyFeatures');
    if (!a) {
      const addrCtrl = this.initFeature({});
      control.push(addrCtrl);
    } else {
      a.forEach(element => {
        const addrCtrl = this.initFeature(element);
        control.push(addrCtrl);
      });
    }
  }
  removeFeature(a: number) {
    const control = <FormArray>this.productForm.get('features');
    control.removeAt(a);
  }
  removeKeyFeature(a: number) {
    const control = <FormArray>this.productForm.get('keyFeatures');
    control.removeAt(a);
  }
  removeVariant(a: number) {
    const control = <FormArray>this.productForm.get('variants');
    control.removeAt(a);
  }
  handleError(error) {
    this.snack.open(<any>error, 'OK', { duration: 2000 });
  }
  save(data: any) {
    if (!data) { return; }
    delete data['_id'];
    let id = this.route.snapshot.params['id'];
    data['ParentCategoryID']=data.category;
    if(this.checkIsPrivateVendor()){
      data['isglobal']=false;
      data['parentID']=this.auth.currentUser._id;
    }else{
      data['isglobal']=true;
      data['parentID']=this.auth.currentUser._id;
    }
    if (id === 'add' || id === 'new') {
      this.busy = this.crud.post('products', data).subscribe(res => this.router.navigateByUrl("/admin/product"), err => this.snack.open(err, 'OK'));
    } else {
      this.busy = this.crud.patch('products', id, data).subscribe(res => this.router.navigateByUrl("/admin/product"), err => this.snack.open(err, 'OK'));
    }
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
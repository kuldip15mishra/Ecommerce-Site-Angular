import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Settings } from './../../settings';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';
import { AuthService } from './../../shared/services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'salientink-home',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  parentCategoryID:any;
  cards: Array<any>;
  products: Array<any> = [];
  product: any;
  brands: Array<any>;
  categories: Array<any>;
  features: Array<any>;
  featuresFilter: any;
  brandsFilter: any;
  busy: Subscription;
  api: string = 'products';
  public filterForm: FormGroup;
  @Input() sort: { predicate: string, reverse: boolean };
  fl: any = { brands: [], categories: [], features: {}, price: [] };
  priceSlider: any;
  q: any;
  categoryQueried: boolean;
  Settings: any;
  private sub: any;
  searchParam: string;
  meta: any = { skip: 0, limit: 10 };
  scrollConfig: any = { suppressScrollX: true };
  priceSliderConfig: any = {
    start: [20, 8000],
    connect: true,
    range: {
      'min': 0, // overridden by [min]
      'max': 10000 // overridden by [max]
    },
    format: {
      to: function (value: number) {
        return Settings.currency.symbol + Math.round(value);
      },
      from: function (value: string) {
        return value.replace(Settings.currency.symbol, '');
      }
    }
  };
  priceRange: any = {};
  myDate: any = new Date();
  vendorprivateuser:boolean=false;
  user:any;

  constructor(private crud: CrudService, private snack: MatSnackBar, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: Http, private auth:AuthService) {
    this.Settings = Settings;
  }
  ngOnInit() {
    this.fl = {};
    this.q = {};
    this.fl.brands = [];
    this.fl.price = [];
    this.fl.categories = [];
    this.fl.features = { Type: [], Fit: [], Fabric: [], Neck: [], Color: [] };
    this.featuresFilter = {};
    this.brandsFilter = [];
    this.priceSlider = {};
    this.filterForm = this._fb.group({
      slider: [10]
    });
    this.parentCategoryID= this.route.params['value'].parentCategoryId
    this.http.get('/api/brands', { params: { limit: 3, sort: '-brand' } }).map(doc => doc.json()).subscribe();
    this.flush();
    this.searchParam = this.route.queryParams['value'].q;
    (this.searchParam) ? this.searchProducts(this.searchParam) : this.checkCategory(); // Required on page load too
    this.sub = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.flush();
      this.searchParam = this.route.queryParams['value'].q;
      (this.searchParam) ? this.searchProducts(this.searchParam) : this.checkCategory(); // Required on page load too

    });

    this.crud.get('products/count').subscribe(data => this.meta.total = data[0].count);
    this.crud.get('products/priceRange').subscribe(data => {
      this.priceRange = data;
      this.priceSliderConfig.range.min = data.min;
      this.priceSliderConfig.range.max = data.max;
    });

    //this.getCurrentuserId();
    this.busy = this.crud.get('brands').subscribe(data => this.brands = data, this.err);
    this.busy = this.crud.get('features/group').subscribe(data => this.features = data, this.err);
  }

  getCurrentuserId() {
    var self=this;
    this.auth.$currentUser.subscribe(res=>{
      if(res )
      {
        if(res.email === ''){
          self.user =self.auth.currentUser;
        }else{
          self.user =res;
        }

        self.checkIsPrivateVendor();

        if(self.vendorprivateuser){
          this.fl.uid = self.user.parentID;

          let body={
            parentID:self.user.parentID
          }
          self.crud.post('products/find',body, true).subscribe(res =>  {
            if (res) {
              self.products = res; 
            }
          }); 
       
       //   self.busy = self.crud.get('products', { params:{where:{uid: self.user.parentID}}}).subscribe(data => {
        // self.busy = self.crud.get('products', { params:{where:{_id: self.user.parentID}}}).subscribe(data => {
        //     if(data){
        //       self.products =  data;
        //     }
        //   });
        }else{
          self.busy = self.crud.get('products').subscribe(data => {
            if(data){
              self.products =  data;
            }
          });
        }
      }
    })
  }

  isloadForPrivateOrGeneral(){
    var self=this;
    this.auth.$currentUser.subscribe(res=>{
      if(res )
      {
        if(res.email === ''){
          self.user =self.auth.currentUser;
        }else{
          self.user =res;
        }

        self.checkIsPrivateVendor();

        
      }
    })
  }
  checkCategory() {
    if (this.route.params['value'].categoryId) {
      this.categoryQueried = true;
      this.fl.categories = [{ _id: this.route.params['value'].categoryId, slug: this.route.params['value'].slug }];
      this.filter();
    }
    else {
      this.categoryQueried = false;
      this.fl.search = undefined; // Required when browse all button at search page is clicked
      this.filter();
    }
  }
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1024) {
      return true;
    } else {
      return false;
    }
  }

  checkIsPrivateVendor(){
    if(this.user && this.user.role === 'vendorprivateuser' || this.user.role === 'privatevendor' ){
      this.vendorprivateuser=true;
    }else{
      this.vendorprivateuser=false;
    }
  }

  getProducts(q?: any, scrolled?: boolean) {
    q = q || {};
    let params = new URLSearchParams();
    params.set('limit', '10');
    q.limit ? params.set('limit', q.limit) : params.set('limit', '10');
    q.skip ? params.set('skip', q.skip) : params.set('skip', '0');
    if (this.meta.sort) { params.set('sort', this.meta.sort); };
    
    if (q.where) params.set('where', JSON.stringify(q.where));
    if (q.search) params.set('search', JSON.stringify(q.search));
    if (this.meta.busy || this.meta.end)
      return;
    this.meta.busy = true;
    //params.set('isglobal', JSON.stringify({isglobal: true}));
    this.busy = this.crud.get('products', params).subscribe(data => {
      this.meta.busy = false;
      this.meta.skip = data.length + this.meta.skip || 0;
      this.meta.end = (data.length >= 5) ? false : true;
      this.products = scrolled ? this.products.concat(data) : data;
    }, error => { this.meta.busy = false; this.snack.open(<any>error, 'OK', { duration: 2000 }) });
  }
  filter(q: any = {}, scrolled?: boolean) {
    let f: any[] = [];
    if (this.fl.features) {
      _.forEach(this.fl.features, function (val, key) {
        if (val.length > 0) {
          f.push({ 'features.key': key, 'features.val': { $in: val } });
        }
      });
    }
    if(this.fl.uid){
      f.push({'uid':this.fl.uid});
    }
    if (this.fl.brands) {
      if (this.fl.brands.length > 0) {
        let brandIds: string[] = [];
        _.forEach(this.fl.brands, function (brand) {
          brandIds.push(brand._id);
        });
        f.push({ 'brand': { $in: brandIds } });
      }
    }
    if (this.fl.categories) {
      this.categories = this.fl.categories;
      if (this.fl.categories.length > 0) {
        let categoryIds: string[] = [];
        _.forEach(this.fl.categories, function (category) {
          categoryIds.push(category._id);
        });
        f.push({ 'category': { $in: categoryIds } });
      }
    }
    if (this.fl.price && this.fl.price.length > 0) {
      f.push({ 'variants.price': { $gt: this.fl.price[0], $lt: this.fl.price[1] } }); // For price slider
    }
    if (this.fl.search) {
      q.search = this.fl.search; // For price slider
    }

    this.isloadForPrivateOrGeneral();
    if(this.vendorprivateuser){
      f.push({ 'isglobal': false })
    }else{
      f.push({ 'isglobal': true })
    }
    
    if (f.length > 0) {
      q.where = { $and: f };
    } else {
      q.where = {};
    }

    
    this.getProducts(q, scrolled);
  }

  toggleBrands(item: any, list: any) {
    if (!this.brandsFilter) this.brandsFilter = [];
    let listArray = this.brandsFilter;
    let idx = listArray.indexOf(item);
    if (idx > -1) listArray.splice(idx, 1);
    else listArray.push(item);
    this.fl.brands = this.brandsFilter;
    this.flush(); // To allow http get request
    this.filter(); // Filters the product list with this.fl as global variable
  }

  toggleFeatures(item: any, list: any) {
    if (!this.featuresFilter[list]) this.featuresFilter[list] = [];
    let listArray = this.featuresFilter[list];
    let idx = listArray.indexOf(item);
    if (idx > -1) listArray.splice(idx, 1);
    else listArray.push(item);
    this.fl.features = this.featuresFilter;
    this.flush(); // To allow http get request
    this.filter(); // Filters the product list with this.fl as global variable
  }

  sortNow(sort: string) {
    this.flush(); // To allow http get request
    this.meta.sort = sort;
    this.filter();
  }

  searchProducts(q: string, flush: boolean = false) {
    this.flush();
    this.fl.search = { name: q };
    this.filter();
  }
  scroll() {
    if (this.meta.busy || this.meta.end) return;
    this.filter({ skip: this.meta.skip, limit: 10 }, true);
  }
  flush() {
    this.meta.end = false;
    this.meta.skip = 0;
    this.meta.limit = 10;
    this.products = []; // Reset query parameters
  }


  removeFeatures(k: string, v: string) {
    let index = this.fl.features[k].indexOf(v);
    if (index > -1) {
      this.fl.features[k].splice(index, 1);
      this.filter();
    }
  }

  removeBrand(brand: any) {
    let index = this.fl.brands.indexOf(brand);
    if (index > -1) {
      this.fl.brands.splice(index, 1);
      this.filter();
    }
  }

  removeCategory() {
    this.fl.categories = undefined;
    this.filter();
  }
  err(err: any) {
    (error: any) => this.snack.open(<any>error, 'OK', { duration: 2000 });
  }
  priceSliderChanged(price: number) {
    this.flush(); // To allow http get request
    this.fl.price = price;
    this.filter();
  }
  ngOnDestroy() {
    this.sub.unsubscribe(); // Used for searching
  }
}

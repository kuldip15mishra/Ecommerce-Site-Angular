import { UserResolve } from './user/user.resolve';
import { UsersGuard } from './user/users.guard';
import { UserComponent } from './user/user.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CartButtonsComponent } from './../shared/cart-buttons/cart-buttons.component';
import { ReviewResolve } from './reviews/review.resolve';
import { ShippingResolve } from './shipping/shipping.resolve';
import { CouponResolve } from './coupons/coupon.resolve';
import { FeatureResolve } from './features/feature.resolve';
import { BrandResolve } from './brands/brand.resolve';
import { ProductsGuard } from './product/products.guard';
import { FeaturesComponent } from './features/features.component';
import { ProductFeaturesComponent } from './product/features/features.component';
import { UsersResolve } from './../shared/services/users.resolve';
import { OrderGuard } from './order/order.guard';
import { ProductGuard } from './product/product.guard';
import { ProductResolve } from './product/product.resolve';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './product/products.component';
import { OrdersComponent } from './order/order.component';
import { OrderResolve } from './order/order.resolve';
import { OrderDetailComponent } from './order/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusyModule } from 'angular2-busy';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MediaComponent } from './media/media.component';
import { VariantsComponent } from './product/variants/variants.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AddressComponent } from './address/address.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BrandsComponent } from './brands/brands.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandDetailComponent } from './brands/brand-detail/brand-detail.component';
import { FeatureDetailComponent } from './features/feature-detail/feature-detail.component';
import { CouponDetailComponent } from './coupons/coupon-detail/coupon-detail.component';
import { ShippingDetailComponent } from './shipping/shipping-detail/shipping-detail.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { TreeModule } from 'angular-tree-component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { OrderContentComponent } from './order/order-content/order-content.component';
import { MatMenuModule, MatSlideToggleModule, MatSelectModule, MatChipsModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, MatSnackBarModule, MatToolbarModule, MatInputModule, MatIconModule, MatTabsModule, MatSidenavModule, MatButtonToggleModule, MatButtonModule, MatListModule, MatCardModule, MatProgressSpinnerModule, MatDatepickerModule } from '@angular/material';
import {VendorComponent} from './vendor/vendor.component';
import {PrivateStoreComponent} from './privatestore/privatestore.component';
import {VendorGuard} from './vendor/vendor.guard';
import {PrivateStoreGuard} from './privatestore/privatestore.guard';
import {CategoriesGuard} from './categories/categories.guard';
import {SubCategoryComponent} from './subcategory/subcategory.component';
//import {SubcategoryetailComponent} from './subcategory/subcategory-detail/subcategory-detail.component';
//import {SubCategoryResolve} from './subcategory/subcategory.resolve';
const routes: Routes = [
  {
    path: 'address', component: AddressComponent,
    data: { title: 'Manage Customer Address' }
  },
  {
    path: 'dashboard', component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'media-library', component: MediaComponent,
    data: { title: 'Media Library' }
  },
  {
    path: 'manage-orders', component: OrdersComponent,
    data: { title: 'Manage Orders' }
  },
  {
    path: 'my-orders', component: MyOrdersComponent,
    data: { title: 'My Orders' }
  },
  {
    path: 'wishlist', component: WishlistComponent,
    data: { title: 'Your Wishlist' }
  },
  {
    path: 'categories', component: CategoriesComponent,
    canActivate:[CategoriesGuard],
    data: { title: 'Manage Categories' }
  },
  {
    path: 'my-reviews', component: MyReviewsComponent,
    data: { title: 'My Reviews' }
  },
  {
    path: 'reviews', component: ReviewsComponent,
    data: { title: 'Manage Reviews' }
  },
  {
    path: 'reviews/:id', component: ReviewDetailComponent,
    resolve: { review: ReviewResolve },
    data: { title: 'Review Detail' }
  },
  {
    path: 'product', component: ProductsComponent,
    canActivate: [ProductsGuard],
    data: { title: 'Products' }
  },
  {
    path: 'product/:id', component: ProductDetailComponent,
    resolve: { product: ProductResolve }, canActivate: [ProductGuard],
    data: { title: 'Add/Edit Products' }
  },

  {
    path: 'brands', component: BrandsComponent,
    data: { title: 'Brands' }
  },
  {
    path: 'subcategory', component: SubCategoryComponent,
    data: { title: 'SubCategory' }
  },
  {
    path: 'brands/:id', component: BrandDetailComponent,
    resolve: { brand: BrandResolve },
    data: { title: 'Brand Details' }
  },
  {
    path: 'features', component: FeaturesComponent,
    data: { title: 'Features' }
  },
  {
    path: 'features/:id', component: FeatureDetailComponent,
    resolve: { feature: FeatureResolve },
    data: { title: 'Add/Edit Features' }
  },
  {
    path: 'coupons', component: CouponsComponent,
    data: { title: 'Coupons' }
  },
  {
    path: 'coupons/:id', component: CouponDetailComponent,
    resolve: { coupon: CouponResolve },
    data: { title: 'Add/Edit Coupons' }
  },
  {
    path: 'shippings', component: ShippingComponent,
    data: { title: 'Shipping Settings' }
  },
  {
    path: 'shippings/:id', component: ShippingDetailComponent, resolve: { shipping: ShippingResolve },
    data: { title: 'Add/Edit Shipping Settings' }
  },
  {
    path: 'users', component: UserComponent,
    canActivate: [UsersGuard],
    data: { title: 'Manage Users' }
  },
  {
    path: 'users/:id', component: UserDetailComponent,
    resolve: { user: UserResolve },
    data: { title: 'User Details' }
  },
  {
    path: 'vendor', component: VendorComponent, 
    canActivate: [VendorGuard], 
    data: { title: 'Create Vendor' }
  },
  {
    path: 'privatestore', component: PrivateStoreComponent,
    canActivate:[PrivateStoreGuard],
    data: { title: 'Create Private User' }
  }
  
];

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes), FlexLayoutModule, ReactiveFormsModule, InfiniteScrollModule,
    BusyModule, MatMenuModule, MatProgressSpinnerModule, MatDatepickerModule, MatSlideToggleModule, MatSelectModule, MatChipsModule, MatProgressBarModule, MatCheckboxModule, MatIconModule, MatInputModule, MatRadioModule, MatSnackBarModule, MatToolbarModule,
    MatTabsModule, MatSidenavModule, MatButtonToggleModule, MatButtonModule, MatListModule, MatCardModule,
    FileUploadModule, TreeModule
  ],
  declarations: [PrivateStoreComponent, VendorComponent,  ProductsComponent, ProductDetailComponent, ProductFeaturesComponent, OrdersComponent, OrderDetailComponent, DashboardComponent, MediaComponent, FeaturesComponent, VariantsComponent, MyOrdersComponent, AddressComponent, ReviewsComponent, MyReviewsComponent, WishlistComponent, BrandsComponent, CouponsComponent, ShippingComponent, CategoriesComponent, BrandDetailComponent, FeatureDetailComponent, CouponDetailComponent, ShippingDetailComponent, ReviewDetailComponent, UserComponent, UserDetailComponent, OrderContentComponent
 ,SubCategoryComponent ],
  providers: [ProductResolve, BrandResolve, FeatureResolve, CouponResolve, ShippingResolve, 
    ProductGuard, ProductsGuard, OrderGuard, ReviewResolve, UserResolve, UsersGuard, 
    VendorGuard,CategoriesGuard,PrivateStoreGuard]
})
export class AdminModule { }

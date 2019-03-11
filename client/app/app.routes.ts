import { ShopComponent } from './home/shop/shop.component';
import { ProductResolve } from './home/product/product.resolve';
import { ProductDetailComponent } from './home/product/product-detail.component';
import { SuccessComponent } from './home/success/success.component';
import { CheckoutGuard } from './home/checkout/checkout.guarg';
import { CheckoutComponent } from './home/checkout/checkout.component';
// import { HomePageComponent } from './home/home/home.component';
import { NotFoundComponent } from './shared/404/404.component';
import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: ShopComponent, data: { title: 'SalientInk - Single Page e-commerce app using Angular4' } },
  { path: 'admin', loadChildren: './admin#AdminModule' },
  { path: 'account', loadChildren: './account#AccountModule' },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard], data: { title: 'Checkout' } },
  { path: 'success', component: SuccessComponent, data: { title: 'Order Placed' } },
  { path: 'product/:slug/:id', component: ProductDetailComponent, resolve: { product: ProductResolve } },
  { path: 'shop', component: ShopComponent, data: { title: 'SalientInk - Single Page e-commerce app using Angular4' } },
  { path: 'product/category/:slug/:categoryId/:parentCategoryId', component: ShopComponent, data: { title: 'Product Details' } },
  { path: '**', component: NotFoundComponent },
];

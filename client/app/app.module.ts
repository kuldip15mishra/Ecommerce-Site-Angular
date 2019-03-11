import { CheckoutGuard } from './home/checkout/checkout.guarg';
import { AccountModule } from './account/account.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from './modal/modal.module';
import { SharedModule } from './shared/shared.module';
import { WishButtonComponent } from './home/wish-button/wish-button.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { ShopComponent } from './home/shop/shop.component';
import { MegamenuComponent } from './home/megamenu/megamenu.component';
import { SuccessComponent } from './home/success/success.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { FeaturedProductsComponent } from './home/featured-products/featured-products.component';
import { ProductDetailComponent } from './home/product/product-detail.component';
import { SalientinkCarouselComponent } from './home/owl-carousel/owl-carousel.component';
import { NewsBannerComponent } from './home/news-banner/news-banner.component';
import { BannerComponent } from './home/banner/banner.component';
import { CartService } from './shared/services/cart.service';
import { CrudService } from './shared/services/crud.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { CrudHelper } from './shared/services/crud.helper';
import { PluralizePipe } from './shared/pipes/pluralize.pipe';
import { ApiService } from './shared/services/api.service';
import { NotFoundComponent } from './shared/404/404.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';
import { MomentModule } from 'angular2-moment';
import { UsersResolve } from './shared/services/users.resolve';
import { ProductResolve } from './home/product/product.resolve';

import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomePageComponent } from './home/home/home.component';
import { AlertModule, ButtonsModule, CarouselModule, ProgressbarModule, SortableModule, TabsModule, TooltipModule, TypeaheadModule } from 'ngx-bootstrap';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { MatMenuModule, MatSlideToggleModule, MatSelectModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule, MatInputModule, MatTabsModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatProgressBarModule, MatButtonModule, MatListModule, MatCheckboxModule, MatToolbarModule, MatCardModule } from '@angular/material';

// import '../assets/css/style.default.css';
import '../styles.scss';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BannerComponent, NewsBannerComponent, SalientinkCarouselComponent, FeaturedProductsComponent, CheckoutComponent, ProductCardComponent, ShopComponent, ProductDetailComponent, MegamenuComponent, MegamenuComponent, SuccessComponent, WishButtonComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    SharedModule,
    ModalModule,
    MatInputModule, MatIconModule, MatTabsModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatProgressBarModule, MatButtonModule, MatToolbarModule, MatListModule, MatCardModule, MatCheckboxModule, MatProgressSpinnerModule,
    BrowserAnimationsModule,
    BusyModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    AccountModule,
    // OwlModule,
    NouisliderModule,
    MomentModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ApiService, UserService, AuthService, PluralizePipe, AuthHttp, CrudHelper, CrudService, UsersResolve, CartService, ProductResolve, AuthGuard, CheckoutGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
  ) { }

}

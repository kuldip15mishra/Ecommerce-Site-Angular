/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { CartService } from './shared/services/cart.service';
import { Subscription } from 'rxjs';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, ActivatedRoute, NavigationCancel, NavigationError } from '@angular/router';
import { Settings } from './settings';
import { Title } from '@angular/platform-browser';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  busy: Subscription;
  private toggleNav: any;
  public cartItems: any;
  private shipping: any;
  Settings: any;
  constructor(private router: Router, public cart: CartService, private http: Http, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.Settings = Settings;
  }

  public ngOnInit() {
    this.busy = this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    this.cartItems = this.cart.items;
    this.cart.getBestShipper().subscribe(data => {
      this.shipping = data[0];
    }, err => console.log(err));
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        if (event.title) this.titleService.setTitle(event.title + ' - SalientInk')
      });
  }
  getQ(pid: string, vid: string) {
    return this.cart.getQuantity(pid, vid);
  }
  getTotalP() {
    return this.cart.getTotalPrice();
  }
  addItem(product: any, qty: number) {
    this.cart.addItem(product, qty);
    // this.getQ(product._id, product.vid);
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}

import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../services/crud.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'salientink-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput: FormControl;
  products: Array<any>;
  @Input() searchBar: boolean = false;
  constructor(private crud: CrudService, private router: Router, private route: ActivatedRoute) {
    this.searchInput = new FormControl();
  }

  filterStates(val: string) {
    return val ? this.products.filter((s) => new RegExp(val, 'gi').test(s.name)) : this.products;
  }

  search(q: string) {
    let vm = this;
    // if (vm.route.url === '/' && q === '') return
    let typingTimer;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
      vm.router.navigateByUrl('/shop?q=' + q);
    }, 600);
  }
  show(x: any) {
    this.searchBar = false;
  }
}
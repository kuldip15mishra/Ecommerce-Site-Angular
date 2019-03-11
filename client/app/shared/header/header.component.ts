import { ModalService } from './../../modal/modal.service';
import { Settings } from './../../settings';
import { AuthService } from './../services/auth.service';
import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit, Pipe, Optional, Output, EventEmitter } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
    @Output() openCrt = new EventEmitter();
    currentUser: any;
    isDarkTheme: boolean = false;
    lastDialogResult: string;
    progress: number = 0;
    searchBar: boolean;
    me: boolean;
    Settings: any;
    @Output() toggleSidenav = new EventEmitter();
    constructor(public auth: AuthService, public cart: CartService, public media: ObservableMedia, public modal: ModalService) {
        this.Settings = Settings;
        // media.subscribe((change: MediaChange) => {
        //     if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        //         this.searchBar = false;
        //     }
        // })
    }

    ngOnInit() {
    }
    openCart() {
        this.openCrt.emit()
    }
    show(x: any) {
        this.searchBar = x;
    }
    login() {
        this.modal.login().subscribe();
    }
}

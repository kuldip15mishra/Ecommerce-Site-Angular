import { AuthService } from './../shared/services/auth.service';
import { UserService } from './../shared/services/user.service';
import { ListComponent } from './list/list.component';
import { MediaLibraryModal } from './media/media-library';
import { CartButtonsComponent } from './../shared/cart-buttons/cart-buttons.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddressComponent } from './address/address.component';
import { DashboardFilterPipe } from './pipes/dashboardFilter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { DialogsModule } from './dialogs/dialogs.module';
import { SingleFileUploadModal } from './media/modal-single';
import { Http, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UniquePipe } from './pipes/unique.pipe';
import { FilterPipe, ObjectFilterPipe } from './pipes/filter.pipe';
import { LabelcasePipe } from './pipes/labelcase.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { SearchComponent } from './search/search.component';
import { OauthButtonsComponent } from './oauth-buttons/oauth-buttons.component';
import { MediaComponent } from './media/media.component';
import { ListImageComponent } from './list-image/list-image.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExportComponent } from './export/export.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BusyModule } from 'angular2-busy';
import { MatMenuModule, MatDatepickerModule, MatSlideToggleModule, MatSelectModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatCheckboxModule, MatIconModule, MatInputModule, MatRadioModule, MatSnackBarModule, MatButtonModule, MatCardModule, MatToolbarModule, MatGridListModule } from '@angular/material';
import 'jquery';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes),
        FormsModule, FileUploadModule,
        ReactiveFormsModule,
        DialogsModule,
        FlexLayoutModule,
        BusyModule,
        MatSnackBarModule, MatMenuModule, MatMenuModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule, MatGridListModule, MatChipsModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatButtonModule, MatCardModule, MatToolbarModule
    ],

    exports: [HeaderComponent, FooterComponent, OauthButtonsComponent, FilterPipe, ObjectFilterPipe, DashboardFilterPipe, PluralizePipe, SearchPipe, LabelcasePipe, SubmitButtonComponent, EditComponent, ExportComponent, SingleFileUploadModal, ListImageComponent, UniquePipe, AddressComponent, CartButtonsComponent, MediaLibraryModal, ListComponent],

    declarations: [ExportComponent, FooterComponent, HeaderComponent, ListImageComponent, MediaComponent, OauthButtonsComponent, SearchComponent, SubmitButtonComponent, PluralizePipe, LabelcasePipe, FilterPipe, ObjectFilterPipe, DashboardFilterPipe, UniquePipe, SearchPipe,
        EditComponent, SingleFileUploadModal, AddressComponent, CartButtonsComponent, MediaLibraryModal,
        ListComponent,
    ],
    providers: [AuthService, UserService],
    entryComponents: [SingleFileUploadModal, MediaLibraryModal]
})
export class SharedModule { }

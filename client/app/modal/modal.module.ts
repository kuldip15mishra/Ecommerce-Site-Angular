import { CancelOrderComponent } from './cancel-order.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModalComponent } from './../account/login/login-modal.component';
import { AccountModule } from './../account/account.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewFormComponent } from './review-form.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from './confirm-modal.component';
import { ModalService } from './modal.service';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule,
    ReactiveFormsModule, FlexLayoutModule,
    SharedModule
  ],
  exports: [
    ConfirmModal, ReviewFormComponent, CancelOrderComponent
  ],
  declarations: [
    ConfirmModal, ReviewFormComponent, CancelOrderComponent
  ],
  providers: [
    ModalService,
  ],
  entryComponents: [
    ConfirmModal, ReviewFormComponent, LoginModalComponent, CancelOrderComponent
  ],
})
export class ModalModule { }
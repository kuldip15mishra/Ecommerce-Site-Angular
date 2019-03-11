import { LoginComponent } from './login/login.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordComponent } from './password/reset.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './login/logout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
import { LoginModalComponent } from './login/login-modal.component';
import { CpComponent } from './cp/cp.component';
import { DetailComponent } from './profile/detail.component';
import { ForgotPasswordComponent } from './password/forgot.component';
import { MatButtonModule, MatMenuModule, MatSlideToggleModule, MatSelectModule, MatChipsModule, MatProgressBarModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTabsModule, MatRadioModule, MatCardModule, MatToolbarModule } from '@angular/material';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'logout', component: LogoutComponent,
    data: { title: 'Logout' }
  },
  {
    path: 'change-password', component: CpComponent,
    data: { title: 'Change Password' }, canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: 'reset-password/:id', component: ResetPasswordComponent,
    data: { title: 'Reset Password' }
  },
  {
    path: 'edit-profile', component: DetailComponent,
    data: { title: 'Edit Profile' }, canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    MatButtonModule, MatIconModule, MatInputModule, MatTabsModule, MatRadioModule,
    CommonModule, SharedModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes), FlexLayoutModule, MatCardModule, MatToolbarModule
  ],
  exports: [LoginModalComponent],
  declarations: [LoginComponent, LoginModalComponent, CpComponent, LogoutComponent, DetailComponent, DetailComponent, ForgotPasswordComponent, ResetPasswordComponent],
})
export class AccountModule { }

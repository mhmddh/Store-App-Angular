import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { LoginPageComponent } from './login-page.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  declarations: [
    LoginPageComponent,
  ],
  providers: [],
})
export class LoginPageModule { }
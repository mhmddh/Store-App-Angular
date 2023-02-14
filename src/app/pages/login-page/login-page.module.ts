import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { LoginPageComponent } from './login-page.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SpinnerModule,
  ],
  declarations: [
    LoginPageComponent,
  ],
  providers: [],
})
export class LoginPageModule { }
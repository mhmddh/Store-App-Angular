import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPageComponent } from './login-page.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    SpinnerModule
  ],
  declarations: [
    LoginPageComponent,
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class LoginPageModule { }
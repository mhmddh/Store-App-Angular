import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CommonService } from 'src/app/services/common.service';
import { BasePageModule } from '../base-page/base-page.module';
import { UserPageComponent } from './user-page.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        AppRoutingModule,
        BasePageModule,
        FontAwesomeModule,
    ],
    declarations: [
        UserPageComponent
    ],
    providers: [CommonService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [UserPageComponent]

})
export class UserPageModule { }
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { BasePageComponent } from './base-page.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NavbarModule,
        SpinnerModule,
        RouterModule,
        FontAwesomeModule
    ],
    declarations: [
        BasePageComponent,
    ],
    exports: [
        BasePageComponent,
    ],
    providers: [CommonService, AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [BasePageComponent]
})
export class BasePageModule { }
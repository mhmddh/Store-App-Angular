import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { BasePageComponent } from './base-page.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
    providers: [],
    bootstrap: [BasePageComponent]
})
export class BasePageModule { }
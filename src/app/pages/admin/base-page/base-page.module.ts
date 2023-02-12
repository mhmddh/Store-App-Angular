import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { BasePageComponent } from './base-page.component';


@NgModule({
    imports: [
        CommonModule,
        NavbarModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
        SpinnerModule,
    ],
    declarations: [
        BasePageComponent,
    ],
    exports: [
        BasePageComponent,
    ],
    // bootstrap: [BasePageComponent]

})
export class BasePageModule { }
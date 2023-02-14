import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        FontAwesomeModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ],
    declarations: [
        BasePageComponent,
    ],
    exports: [
        BasePageComponent,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [BasePageComponent]
})
export class BasePageModule { }
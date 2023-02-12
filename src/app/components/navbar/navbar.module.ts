import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarComponent } from './navbar.component';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        AppRoutingModule
    ],
    declarations: [
        NavbarComponent,
    ],
    exports: [
        NavbarComponent,
    ],
    bootstrap: [NavbarComponent]

})
export class NavbarModule { }
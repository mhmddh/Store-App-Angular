import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        RouterModule,
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
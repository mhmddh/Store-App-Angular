import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel.component';


@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
        CarouselComponent,
    ],
    exports: [
        CarouselComponent,
    ],
    bootstrap: [CarouselComponent]
})
export class CarouselModule { }
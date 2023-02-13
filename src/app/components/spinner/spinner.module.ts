import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


@NgModule({
    imports: [CommonModule],
    declarations: [
        SpinnerComponent,
    ],
    exports: [
        SpinnerComponent,
    ],
    bootstrap: [SpinnerComponent]

})
export class SpinnerModule { }
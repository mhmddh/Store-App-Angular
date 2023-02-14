import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrandEffects } from 'src/app/store/effectors/brand.effects';
import { paginationBrandReducer } from 'src/app/store/reducers/brand.reducer';
import { BasePageModule } from '../base-page.module';
import { BrandPageDetailComponent } from './brand-page-detail/brand-page-detail.component';
import { BrandPageListComponent } from './brand-page-list/brand-page-list.component';
import { BrandRoutingModule } from './brand-routing.module';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('brandsResponse', paginationBrandReducer),
        EffectsModule.forFeature([ BrandEffects]),
        BrandRoutingModule,
        BasePageModule
    ],
    declarations: [
        BrandPageDetailComponent,
        BrandPageListComponent
    ],
    providers: [],
    bootstrap: [BrandPageDetailComponent, BrandPageListComponent]

})
export class BrandPageModule { }
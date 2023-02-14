import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarouselModule } from 'src/app/components/carousel/carousel.module';
import { BrandEffects } from 'src/app/store/effectors/brand.effects';
import { CategoryEffects } from 'src/app/store/effectors/category.effects';
import { ProductEffects } from 'src/app/store/effectors/product.effects';
import { allBrandReducer } from 'src/app/store/reducers/brand.reducer';
import { allCategoryReducer } from 'src/app/store/reducers/category.reducer';
import { productReducer } from 'src/app/store/reducers/product.reducer';
import { BasePageModule } from '../base-page.module';
import { ProductPageDetailComponent } from './product-page-detail/product-page-detail.component';
import { ProductPageListComponent } from './product-page-list/product-page-list.component';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    StoreModule.forFeature('categories', allCategoryReducer),
    StoreModule.forFeature('productsResponse', productReducer),
    StoreModule.forFeature('brands', allBrandReducer),
    EffectsModule.forFeature([CategoryEffects, ProductEffects, BrandEffects]),
    ProductRoutingModule,
    BasePageModule
  ],
  declarations: [
    ProductPageDetailComponent,
    ProductPageListComponent
  ],
  providers: [],
})
export class ProductPageModule { }
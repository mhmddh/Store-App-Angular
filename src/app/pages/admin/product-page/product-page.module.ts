import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CarouselModule } from 'src/app/components/carousel/carousel.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CommonService } from 'src/app/services/common.service';
import { BrandEffects } from 'src/app/store/effectors/brand.effects';
import { CategoryEffects } from 'src/app/store/effectors/category.effects';
import { ProductEffects } from 'src/app/store/effectors/product.effects';
import { allBrandReducer, paginationBrandReducer } from 'src/app/store/reducers/brand.reducer';
import { allCategoryReducer, paginationCategoryReducer } from 'src/app/store/reducers/category.reducer';
import { productReducer } from 'src/app/store/reducers/product.reducer';
import { BasePageModule } from '../base-page/base-page.module';
import { ProductPageDetailComponent } from './product-page-detail/product-page-detail.component';
import { ProductPageListComponent } from './product-page-list/product-page-list.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    BasePageModule,
    FontAwesomeModule,
    CarouselModule,
    StoreModule.forFeature('categories', allCategoryReducer),
    StoreModule.forFeature('productsResponse', productReducer),
    StoreModule.forFeature('brands', allBrandReducer),
    EffectsModule.forFeature([CategoryEffects, ProductEffects, BrandEffects]),

  ],
  declarations: [
    ProductPageDetailComponent,
    ProductPageListComponent
  ],
  providers: [CommonService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [ProductPageDetailComponent, ProductPageListComponent]

})
export class ProductPageModule { }
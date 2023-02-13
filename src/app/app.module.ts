import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { BrandEffects } from './store/effectors/brand.effects';
import { ProductEffects } from './store/effectors/product.effects';
import { CategoryEffects } from './store/effectors/category.effects';
import { allCategoryReducer, paginationCategoryReducer } from './store/reducers/category.reducer';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducer';
import { allBrandReducer, paginationBrandReducer } from './store/reducers/brand.reducer';
import { ProductPageModule } from './pages/base-page/product-page/product-page.module';
import { CategoryPageModule } from './pages/base-page/category-page/category-page.module';
import { BrandPageModule } from './pages/base-page/brand-page/brand-page.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        categoriesResponse: paginationCategoryReducer, categories: allCategoryReducer,
        productsResponse: productReducer,
        brandsResponse: paginationBrandReducer, brands: allBrandReducer
      }
    ),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, BrandEffects]),
    LoginPageModule,
    ProductPageModule,
    CategoryPageModule,
    BrandPageModule
  ],
  declarations: [
    AppComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
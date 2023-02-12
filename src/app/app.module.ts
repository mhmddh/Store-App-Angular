import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/admin/login-page/login-page.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerModule } from './components/spinner/spinner.module';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BasePageModule } from './pages/admin/base-page/base-page.module';
import { ProductPageModule } from './pages/admin/product-page/product-page.module';
import { EffectsModule } from '@ngrx/effects';
import { CategoryPageModule } from './pages/admin/category-page/category-page.module';
import { BrandPageModule } from './pages/admin/brand-page/brand-page.module';
import { BrandEffects } from './store/effectors/brand.effects';
import { ProductEffects } from './store/effectors/product.effects';
import { CategoryEffects } from './store/effectors/category.effects';
import { allCategoryReducer, paginationCategoryReducer } from './store/reducers/category.reducer';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducer';
import { allBrandReducer, paginationBrandReducer } from './store/reducers/brand.reducer';
import { UserPageModule } from './pages/admin/user-page/user-page.module';



@NgModule({
  imports: [
    LoginPageModule,
    BrowserModule,
    AppRoutingModule,
    BasePageModule,
    ProductPageModule,
    CategoryPageModule,
    BrandPageModule,
    UserPageModule,
    StoreModule.forRoot(
      {
        categoriesResponse: paginationCategoryReducer, categories: allCategoryReducer,
        productsResponse: productReducer,
        brandsResponse: paginationBrandReducer, brands: allBrandReducer
      }
    ),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, BrandEffects]),
  ],
  declarations: [
    AppComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
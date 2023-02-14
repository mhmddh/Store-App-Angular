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
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonService } from './services/common.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        categoriesResponse: paginationCategoryReducer, categories: allCategoryReducer,
        productsResponse: productReducer,
        brandsResponse: paginationBrandReducer, brands: allBrandReducer
      }
    ),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, BrandEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    LoginPageModule,
  ],
  declarations: [
    AppComponent,
  ],

  providers: [CommonService, AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
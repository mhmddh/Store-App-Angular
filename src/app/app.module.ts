import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/admin/login-page/login-page.component';
import { BrandPageListComponent } from './pages/admin/brand-page/brand-page-list/brand-page-list.component';
import { BrandPageDetailComponent } from './pages/admin/brand-page/brand-page-detail/brand-page-detail.component';
import { ProductPageDetailComponent } from './pages/admin/product-page/product-page-detail/product-page-detail.component';
import { ProductPageListComponent } from './pages/admin/product-page/product-page-list/product-page-list.component';
import { CategoryPageListComponent } from './pages/admin/category-page/category-page-list/category-page-list.component';
import { CategoryPageDetailComponent } from './pages/admin/category-page/category-page-detail/category-page-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { BasePageComponent } from './pages/admin/base-page/base-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './services/auth-interceptor';
import { CommonService } from './services/common.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthService } from './services/auth.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionModalComponent } from './components/modals/action-modal/action-modal.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effectors/product.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { categoryReducer } from './store/reducers/category.reducer';
import { CategoryEffects } from './store/effectors/category.effects';
import { brandReducer } from './store/reducers/brand.reducer';
import { BrandEffects } from './store/effectors/brand.effects';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppRoutingModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ categoriesResponse: categoryReducer, productsResponse: productReducer, brandsResponse: brandReducer }),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, BrandEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    // <-- here
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    BrandPageListComponent,
    BrandPageDetailComponent,
    ProductPageDetailComponent,
    ProductPageListComponent,
    CategoryPageListComponent,
    CategoryPageDetailComponent,
    UserPageComponent,
    BasePageComponent,
    SpinnerComponent,
    CarouselComponent,
    NavbarComponent,
    ActionModalComponent,
    PageNotFoundComponent,
  ],
  providers: [CommonService, AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  // providers: [CommonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
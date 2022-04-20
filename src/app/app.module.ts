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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatProgressSpinnerModule

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
  ],
  providers: [CommonService, AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  // providers: [CommonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
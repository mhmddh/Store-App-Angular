import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BrandPageListComponent } from './pages/brand-page/brand-page-list/brand-page-list.component';
import { BrandPageDetailComponent } from './pages/brand-page/brand-page-detail/brand-page-detail.component';
import { ProductPageDetailComponent } from './pages/product-page/product-page-detail/product-page-detail.component';
import { ProductPageListComponent } from './pages/product-page/product-page-list/product-page-list.component';
import { CategoryPageListComponent } from './pages/category-page/category-page-list/category-page-list.component';
import { CategoryPageDetailComponent } from './pages/category-page/category-page-detail/category-page-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
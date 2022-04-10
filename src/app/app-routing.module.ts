import { UserPageComponent } from './pages/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductPageDetailComponent } from './pages/product-page/product-page-detail/product-page-detail.component'
import { BrandPageDetailComponent } from './pages/brand-page/brand-page-detail/brand-page-detail.component'
import { CategoryPageDetailComponent } from './pages/category-page/category-page-detail/category-page-detail.component'
import { ProductPageListComponent } from './pages/product-page/product-page-list/product-page-list.component';
import { BrandPageListComponent } from './pages/brand-page/brand-page-list/brand-page-list.component';
import { CategoryPageListComponent } from './pages/category-page/category-page-list/category-page-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'products', canActivate: [AuthGuard], component: ProductPageListComponent },
  { path: 'product/edit/:idProduct', canActivate: [AuthGuard], component: ProductPageDetailComponent },
  { path: 'brand/edit/:idBrand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
  { path: 'category/edit/:idCategory', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
  { path: 'user/:idUser', canActivate: [AuthGuard], component: UserPageComponent },
  { path: 'create-brand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
  { path: 'create-category', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
  { path: 'create-product', canActivate: [AuthGuard], component: ProductPageDetailComponent },
  { path: 'categories', canActivate: [AuthGuard], component: CategoryPageListComponent },
  { path: 'brands', canActivate: [AuthGuard], component: BrandPageListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

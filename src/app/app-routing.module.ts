import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/admin/login-page/login-page.component';
import { ProductPageDetailComponent } from './pages/admin/product-page/product-page-detail/product-page-detail.component'
import { BrandPageDetailComponent } from './pages/admin/brand-page/brand-page-detail/brand-page-detail.component'
import { CategoryPageDetailComponent } from './pages/admin/category-page/category-page-detail/category-page-detail.component'
import { ProductPageListComponent } from './pages/admin/product-page/product-page-list/product-page-list.component';
import { BrandPageListComponent } from './pages/admin/brand-page/brand-page-list/brand-page-list.component';
import { CategoryPageListComponent } from './pages/admin/category-page/category-page-list/category-page-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'admin', component: LoginPageComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin/products', canActivate: [AuthGuard], component: ProductPageListComponent },
  { path: 'admin/product/edit/:idProduct', canActivate: [AuthGuard], component: ProductPageDetailComponent },
  { path: 'admin/brand/edit/:idBrand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
  { path: 'admin/category/edit/:idCategory', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
  { path: 'admin/user/:idUser', canActivate: [AuthGuard], component: UserPageComponent },
  { path: 'admin/brands/create-brand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
  { path: 'admin/categories/create-category', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
  { path: 'admin/products/create-product', canActivate: [AuthGuard], component: ProductPageDetailComponent },
  { path: 'admin/categories', canActivate: [AuthGuard], component: CategoryPageListComponent },
  { path: 'admin/brands', canActivate: [AuthGuard], component: BrandPageListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

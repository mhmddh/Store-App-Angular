// import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [

  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: "products",
    loadChildren: () =>
      import("./pages/base-page/product-page/product-page.module").then(m => m.ProductPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "categories",
    loadChildren: () =>
      import("./pages/base-page/category-page/category-page.module").then(m => m.CategoryPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "brands",
    loadChildren: () =>
      import("./pages/base-page/brand-page/brand-page.module").then(m => m.BrandPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: "user/:idUser",
    loadChildren: () =>
      import("./pages/base-page/user-page/user-page.module").then(m => m.UserPageModule),
    canActivate: [AuthGuard]
  },



  { path: '**', redirectTo: '404', pathMatch: 'full' },
  {
    path: '404', pathMatch: 'full',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

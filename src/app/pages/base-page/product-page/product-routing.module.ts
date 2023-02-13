import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ProductPageDetailComponent } from './product-page-detail/product-page-detail.component';
import { ProductPageListComponent } from './product-page-list/product-page-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ProductPageListComponent },
  { path: 'edit/:idProduct', canActivate: [AuthGuard], component: ProductPageDetailComponent },
  { path: 'create-product', canActivate: [AuthGuard], component: ProductPageDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

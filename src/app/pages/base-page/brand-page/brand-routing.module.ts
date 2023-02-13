// import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { BrandPageDetailComponent } from './brand-page-detail/brand-page-detail.component';
import { BrandPageListComponent } from './brand-page-list/brand-page-list.component';

const routes: Routes = [
    { path: 'edit/:idBrand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
    { path: 'create-brand', canActivate: [AuthGuard], component: BrandPageDetailComponent },
    { path: '', canActivate: [AuthGuard], component: BrandPageListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrandRoutingModule { }

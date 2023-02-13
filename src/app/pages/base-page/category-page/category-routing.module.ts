// import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CategoryPageDetailComponent } from './category-page-detail/category-page-detail.component';
import { CategoryPageListComponent } from './category-page-list/category-page-list.component';

const routes: Routes = [
    { path: 'edit/:idCategory', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
    { path: 'create-category', canActivate: [AuthGuard], component: CategoryPageDetailComponent },
    { path: '', canActivate: [AuthGuard], component: CategoryPageListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }

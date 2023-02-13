// import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { UserPageComponent } from './user-page.component';

const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: UserPageComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }

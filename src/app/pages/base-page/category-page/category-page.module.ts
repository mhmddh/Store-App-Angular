import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CommonService } from 'src/app/services/common.service';
import { CategoryEffects } from 'src/app/store/effectors/category.effects';
import { paginationCategoryReducer } from 'src/app/store/reducers/category.reducer';
import { BasePageModule } from '../base-page.module';
import { CategoryPageDetailComponent } from './category-page-detail/category-page-detail.component';
import { CategoryPageListComponent } from './category-page-list/category-page-list.component';
import { CategoryRoutingModule } from './category-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        FontAwesomeModule,
        StoreModule.forFeature('categoriesResponse', paginationCategoryReducer),
        EffectsModule.forFeature([CategoryEffects]),
        CategoryRoutingModule,
        BasePageModule
    ],
    declarations: [
        CategoryPageDetailComponent,
        CategoryPageListComponent
    ],
    providers: [CommonService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [CategoryPageDetailComponent, CategoryPageListComponent]

})
export class CategoryPageModule { }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryEffects } from 'src/app/store/effectors/category.effects';
import { paginationCategoryReducer } from 'src/app/store/reducers/category.reducer';
import { BasePageModule } from '../base-page.module';
import { CategoryPageDetailComponent } from './category-page-detail/category-page-detail.component';
import { CategoryPageListComponent } from './category-page-list/category-page-list.component';
import { CategoryRoutingModule } from './category-routing.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('categoriesResponse', paginationCategoryReducer),
        EffectsModule.forFeature([CategoryEffects]),
        CategoryRoutingModule,
        BasePageModule
    ],
    declarations: [
        CategoryPageDetailComponent,
        CategoryPageListComponent
    ],
    providers: [],
    bootstrap: [CategoryPageDetailComponent, CategoryPageListComponent]

})
export class CategoryPageModule { }
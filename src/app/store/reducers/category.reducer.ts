import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/common/models/model';
import { loadAllCategoriesSuccess, loadPaginatedCategoriesSuccess } from '../actions/category.action';
import { paginatedCategories } from '../states/category.state';

export const paginatedInitialState: paginatedCategories = {};
export const allInitialState: Category[] = [];

export const paginationCategoryReducer = createReducer(
    paginatedInitialState,
    on(loadPaginatedCategoriesSuccess, (state, { categoriesResponse }) => (categoriesResponse)),
);

export const allCategoryReducer = createReducer(
    allInitialState,
    on(loadAllCategoriesSuccess, (state, { categories }) => (categories)),
);
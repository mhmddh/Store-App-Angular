import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/common/models/model';
import { paginatedCategories } from '../states/category.state';

export const LOAD_PAGINATED_CATEGORIES = '[Categories] load paginated categories';
export const LOAD_PAGINATED_CATEGORIES_SUCCESS = '[Categories] load paginated categories success';
export const LOAD_ALL_CATEGORIES = '[Categories] load all categories';
export const LOAD_ALL_CATEGORIES_SUCCESS = '[Categories] load all categories success';
export const loadPaginatedCategories = createAction(LOAD_PAGINATED_CATEGORIES);
export const loadPaginatedCategoriesSuccess = createAction(LOAD_PAGINATED_CATEGORIES_SUCCESS, props<{ categoriesResponse: paginatedCategories}>());
export const loadAllCategories = createAction(LOAD_ALL_CATEGORIES);
export const loadAllCategoriesSuccess = createAction(LOAD_ALL_CATEGORIES_SUCCESS, props<{ categories: Category[]}>());

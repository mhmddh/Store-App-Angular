import { createAction, props } from '@ngrx/store';
import { CategoriesResponse } from '../states/category.state';

export const LOAD_CATEGORIES = '[Categories] load categories';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] load categories success';
export const DUMMY_ACTION = '[dummy action]';

export const loadCategories = createAction(LOAD_CATEGORIES);
export const loadCategoriesSuccess = createAction(LOAD_CATEGORIES_SUCCESS, props<{ categoriesResponse: CategoriesResponse}>());
export const dummyAction = createAction('[dummy action]');
import { createReducer, on } from '@ngrx/store';
import { loadCategoriesSuccess } from '../actions/category.action';
import { CategoriesResponse } from '../states/category.state';

export const initialState: CategoriesResponse = {};

export const categoryReducer = createReducer(
    initialState,
    on(loadCategoriesSuccess, (state, { categoriesResponse }) => (categoriesResponse)),
);
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { CategoriesResponse, CategoriesState } from '../states/category.state';

export const CATEGORY_STATE_NAME = 'categoriesResponse';
export const categoriesState = createEntityAdapter<CategoriesResponse>({
});
const getCategoriesState = createFeatureSelector<CategoriesState>(CATEGORY_STATE_NAME);

export const categoriesSelectors = categoriesState.getSelectors();
export const getCategories = createSelector(getCategoriesState, categoriesSelectors.selectAll);
export const getAllCategories = createSelector(getCategoriesState, (state) => state);
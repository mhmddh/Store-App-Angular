import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category } from 'src/app/common/models/model';
import { paginatedCategories, paginatedCategoriesState } from '../states/category.state';

export const PAGINATED_CATEGORY_STATE_NAME = 'categoriesResponse';
export const ALL_CATEGORY_STATE_NAME = 'categories';

const getPaginatedCategoriesState = createFeatureSelector<paginatedCategoriesState>(PAGINATED_CATEGORY_STATE_NAME);
const getAllCategoriesState = createFeatureSelector<Category[]>(ALL_CATEGORY_STATE_NAME);

export const getPaginatedCategories = createSelector(getPaginatedCategoriesState, (state) => state);
export const getAllCategories = createSelector(getAllCategoriesState, (state) => state);
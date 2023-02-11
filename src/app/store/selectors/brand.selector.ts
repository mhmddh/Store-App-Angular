import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { BrandsResponse, BrandsState } from '../states/brand.state';

export const BRAND_STATE_NAME = 'brandsResponse';
export const brandsState = createEntityAdapter<BrandsResponse>({
});
const getBrandsState = createFeatureSelector<BrandsState>(BRAND_STATE_NAME);

export const brandsSelectors = brandsState.getSelectors();
export const getBrands = createSelector(getBrandsState, brandsSelectors.selectAll);
export const getAllBrands = createSelector(getBrandsState, (state) => state);
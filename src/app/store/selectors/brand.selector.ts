import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandsState } from '../states/brand.state';
import { Brand } from 'src/app/common/models/model';


export const PAGINATED_BRAND_STATE_NAME = 'brandsResponse';
export const ALL_BRAND_STATE_NAME = 'brands';

const getPaginatedBrandsState = createFeatureSelector<BrandsState>(PAGINATED_BRAND_STATE_NAME);
const getAllBrandsState = createFeatureSelector<Brand[]>(ALL_BRAND_STATE_NAME);

export const getAllBrands = createSelector(getAllBrandsState, (state) => state);
export const getPaginatedBrands = createSelector(getPaginatedBrandsState, (state) => state);
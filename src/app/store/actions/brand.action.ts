import { createAction, props } from '@ngrx/store';
import { Brand } from 'src/app/common/models/model';
import { BrandsResponse } from '../states/brand.state';

export const LOAD_ALL_BRANDS = '[Brands] load all brands';
export const LOAD_ALL_BRANDS_SUCCESS = '[Brands] load all brands success';
export const LOAD_PAGINATED_BRANDS = '[Brands] load paginated brands';
export const LOAD_PAGINATED_BRANDS_SUCCESS = '[Brands] load paginated brands success';

export const loadAllBrands = createAction(LOAD_ALL_BRANDS);
export const loadAllBrandsSuccess = createAction(LOAD_ALL_BRANDS_SUCCESS, props<{ brands: Brand[] }>());
export const loadPaginatedBrands = createAction(LOAD_PAGINATED_BRANDS);
export const loadPaginatedBrandsSuccess = createAction(LOAD_PAGINATED_BRANDS_SUCCESS, props<{ brandsResponse: BrandsResponse }>());

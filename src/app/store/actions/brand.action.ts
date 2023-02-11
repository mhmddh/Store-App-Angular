import { createAction, props } from '@ngrx/store';
import { BrandsResponse } from '../states/brand.state';

export const LOAD_BRANDS = '[Brands] load brands';
export const LOAD_BRANDS_SUCCESS = '[Brands] load brands success';
export const DUMMY_ACTION = '[dummy action]';

export const loadBrands = createAction(LOAD_BRANDS);
export const loadBrandsSuccess = createAction(LOAD_BRANDS_SUCCESS, props<{ brandsResponse: BrandsResponse }>());
export const dummyAction = createAction('[dummy action]');
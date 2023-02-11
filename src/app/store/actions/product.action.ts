import { createAction, props } from '@ngrx/store';
import { Paginater } from 'src/app/common/models/model';
import { ProductsResponse } from '../states/product.state';

export const LOAD_PRODUCTS = '[Products] load products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] load products success';
export const DUMMY_ACTION = '[dummy action]';

export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(LOAD_PRODUCTS_SUCCESS, props<{ productsResponse: ProductsResponse }>());
export const dummyAction = createAction('[dummy action]');
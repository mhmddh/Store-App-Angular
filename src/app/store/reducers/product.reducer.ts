import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from '../actions/product.action';
import { ProductsResponse } from '../states/product.state';

export const initialState: ProductsResponse = {};

export const productReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { productsResponse }) => (productsResponse)),
);
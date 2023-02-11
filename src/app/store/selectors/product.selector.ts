import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsResponse, ProductsState } from '../states/product.state';
import { createEntityAdapter } from '@ngrx/entity';

export const PRODUCT_STATE_NAME = 'productsResponse';
export const productsState = createEntityAdapter<ProductsResponse>({
});
const getProductsState = createFeatureSelector<ProductsState>(PRODUCT_STATE_NAME);

export const productsSelectors = productsState.getSelectors();
export const getProducts = createSelector(getProductsState, productsSelectors.selectAll);
export const getAllProducts = createSelector(getProductsState, (state) => state);
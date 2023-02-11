import { createReducer, on } from '@ngrx/store';
import { loadBrandsSuccess } from '../actions/brand.action';
import { BrandsResponse } from '../states/brand.state';

export const initialState: BrandsResponse = {};

export const brandReducer = createReducer(
    initialState,
    on(loadBrandsSuccess, (state, { brandsResponse }) => (brandsResponse)),
);
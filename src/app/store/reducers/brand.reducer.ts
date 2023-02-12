import { createReducer, on } from '@ngrx/store';
import { Brand } from 'src/app/common/models/model';
import { loadAllBrandsSuccess, loadPaginatedBrandsSuccess } from '../actions/brand.action';
import { BrandsResponse } from '../states/brand.state';

export const paginatedInitialState: BrandsResponse = {};
export const allInitialState: Brand[] = [];

export const paginationBrandReducer = createReducer(
    paginatedInitialState,
    on(loadPaginatedBrandsSuccess, (state, { brandsResponse }) => (brandsResponse)),
);


export const allBrandReducer = createReducer(
    allInitialState,
    on(loadAllBrandsSuccess, (state, { brands }) => (brands)),
);
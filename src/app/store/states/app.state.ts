import { RouterReducerState } from "@ngrx/router-store";
import { BRAND_STATE_NAME } from "../selectors/brand.selector";
import { CATEGORY_STATE_NAME } from "../selectors/category.selector";
import { PRODUCT_STATE_NAME } from "../selectors/product.selector";
import { BrandsState } from "./brand.state";
import { CategoriesState } from "./category.state";
import { ProductsState } from "./product.state";

export interface AppState {
    [PRODUCT_STATE_NAME]: ProductsState;
    [CATEGORY_STATE_NAME]: CategoriesState;
    [BRAND_STATE_NAME]: BrandsState;
    router: RouterReducerState;
}
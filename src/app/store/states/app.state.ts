import { RouterReducerState } from "@ngrx/router-store";
import { Brand, Category } from "src/app/common/models/model";
import { ALL_BRAND_STATE_NAME, PAGINATED_BRAND_STATE_NAME } from "../selectors/brand.selector";
import { ALL_CATEGORY_STATE_NAME, PAGINATED_CATEGORY_STATE_NAME } from "../selectors/category.selector";
import { PRODUCT_STATE_NAME } from "../selectors/product.selector";
import { BrandsState } from "./brand.state";
import { paginatedCategories, paginatedCategoriesState } from "./category.state";
import { ProductsState } from "./product.state";

export interface AppState {
    [PRODUCT_STATE_NAME]: ProductsState;
    [PAGINATED_CATEGORY_STATE_NAME]: paginatedCategoriesState;
    [ALL_CATEGORY_STATE_NAME]: Category[];
    [PAGINATED_BRAND_STATE_NAME]: BrandsState;
    [ALL_BRAND_STATE_NAME]: Brand[];
    router: RouterReducerState;
}
import { EntityState } from "@ngrx/entity";
import { Product } from "src/app/common/models/model";

export interface ProductsResponse {
    products?: Product[],
    pages?: number,
    nbOfItems?: number,
}


export interface ProductsState extends EntityState<ProductsResponse> {
    products: Product[];
    pages: number,
    nbOfItems: number,
}
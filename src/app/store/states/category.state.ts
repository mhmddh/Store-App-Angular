import { EntityState } from "@ngrx/entity";
import {  Category } from "src/app/common/models/model";


export interface CategoriesResponse{
    categories?: Category[],
    pages?: number,
    nbOfItems?: number,
}

export interface CategoriesState extends EntityState<CategoriesResponse> {
    categories: Category[];
    pages: number,
    nbOfItems: number,
}
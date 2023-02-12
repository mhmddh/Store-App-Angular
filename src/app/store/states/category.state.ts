import { EntityState } from "@ngrx/entity";
import {  Category } from "src/app/common/models/model";


export interface paginatedCategories{
    categories?: Category[],
    pages?: number,
    nbOfItems?: number,
}

export interface paginatedCategoriesState extends EntityState<paginatedCategories> {
    categories: Category[];
    pages: number,
    nbOfItems: number,
}
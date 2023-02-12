import { EntityState } from "@ngrx/entity";
import { Brand } from "src/app/common/models/model";


export interface BrandsResponse{
    brands?: Brand[],
    pages?: number,
    nbOfItems?: number,
}

export interface paginatedBrandsState extends EntityState<BrandsResponse> {
    brands: Brand[];
    pages: number,
    nbOfItems: number,
}
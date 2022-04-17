
export interface LoginResponse {
    data: any;
    status: string;
    message: string;
}

export interface Product {
    id: number;
    name?: string;
    price?: number;
    product_image?: string;
    category?: string;
    category_id?: number;
    brand?: string;
    brand_id?: number,
    brand_image?: string;
    created_at?: string;
}


export interface Category {
    id: number;
    name?: string;
    created_at?: string;
}


export interface Brand {
    id: number;
    name?: string;
    image?: string;
    created_at?: string;
}

export interface User {
    id?: number;
    name?: string;
    email?: string;
};


export interface BasePage {
    title: string;
    routeUrl: string;
    routeTitle: string;
    loading: boolean;
    currentPage?: number;
    totalPages?: number;
    // sortParameters?: Array<string>;
}

export interface Paginater {
    limit: number;
    currentPage: number;
    totalPages: number;
    sortParameters: Array<string>;
    searchKey?: string;
    searchValue?: string;
}

export interface Spinner{
    strokeWidth: number;
    class : string;
}

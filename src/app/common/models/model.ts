
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
}


export interface Category {
    id: number;
    name?: string;
}


export interface Brand {
    id: number;
    name?: string;
    image?: string;
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
    routeUrl2: string;
    routeTitle2: string;
    resourcesLoaded: boolean;
    limit?: number;
    currentPage?: number;
    totalPages?: number;
}

export interface Paginater {
    limit: number;
    currentPage: number;
    totalPages: number;
}
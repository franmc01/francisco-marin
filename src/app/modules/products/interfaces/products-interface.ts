export interface ProductsResponse {
    data: Product[];
}

export interface Product {
    id:            string;
    name:          string;
    description:   string;
    logo:          string;
    date_release:  Date;
    date_revision: Date;
}

export type ActionType = 'edit' | 'delete' | 'view';


export interface ProductSaveResponse {
    message: string;
    data:    Product;
}
export interface ProductEditedResponse extends ProductSaveResponse {}
export interface ProductRemovedResponse extends Pick<ProductSaveResponse, 'message'> {}



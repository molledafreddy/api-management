
export interface Product {
    name: string;
    description?: string;
    clasification?: 'regular' | 'promotion';
    type: 'granel' | 'unidad';
    price?: string;
    categoryProducts: string;
    status?: boolean;
}
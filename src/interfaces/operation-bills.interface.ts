
export interface OperationBills {
    amount: number;
    type: 'salary' | 'administrative' | 'accountant' | 'investment' |'light_service' | 'water_service' | 'common_expense' | 'decrease' | 'rent' | 'cleaning_products' | 'profits' | 'construction_materials' | 'workforce' | 'implements' | 'remodeling' | 'publicity' | 'innovation' | 'other';
    description?: String;
}
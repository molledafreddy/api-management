import { Egress } from "./egress.interface";
import { RequestFiles } from "./request-files.interface";

export interface RequestOperationBills  {
    id?: string;
    amount?: number;
    description?: String;
    type: 'salary' | 'administrative' | 'accountant' | 'investment' |'light service' | 'water service' | 'common expense' | 'decrease' | 'rent' | 'cleaning_products' | 'profits' | 'construction_materials' | 'workforce' | 'implements' | 'remodeling' | 'publicity' | 'innovation' | 'other';
    egress?: Egress;
    users?: string;
    files?:[ RequestFiles];
    dataFiles?: [any];
}


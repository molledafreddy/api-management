import { Auth } from "./auth.interface";

export interface Order extends Auth {
    type: string;
    paymentDate: Date;
    receptionDate: Date;
    EstimatereceptionDate: Date;
    orderDate: Date;
    description: String;
    status: string;
    estimatedAmount: Number;
    created: Date;
    providers: string;
    paymentMethod: 'discounted' | 'credit' | 'partial';
}
import { Auth } from "./auth.interface";

export interface Order extends Auth {
    id?: string;
    paymentDate?: Date;
    receptionDate?: Date;
    EstimateReceptionDate?: Date;
    creditPaymentDate?: Date;
    orderDate?: Date;
    descriptionOrder?: String;
    status: 'requested' | 'received' | 'no_received' | 'verified' | 'cancelled' | 'cancelled_provider' | 'paid_out' | 'pending_for_payment';
    estimatedAmount?: Number;
    amountPaid?: number;
    providers?: string;
    paymentMethod: 'discounted' | 'credit' | 'partial' | 'consignment';
    invoiceFile?: string;
    validAdmin?: 'Verificado' | 'por_verificar' | 'con_error';
    noteValid?: string;
    validDate?: Date;
    usersAdmin?: string;
    role?: string;
}
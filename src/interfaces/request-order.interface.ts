import { Egress } from "./egress.interface";
import { RequestFiles } from "./request-files.interface";

export interface RequestOrder  {
    _id?: string;
    paymentDate?: Date;
    receptionDate?: Date;
    EstimateReceptionDate?: Date;
    creditPaymentDate?: Date;
    amountPaid?: number;
    invoiceNumber?: number;
    orderDate?: Date;
    descriptionOrder?: String;
    descriptionPayment?: String;
    descriptionLogistic?: String;
    status: 'requested' | 'received' | 'no_received' | 'verified' | 'cancelled' | 'cancelled_provider' | 'paid_out' | 'pending_for_payment';
    estimatedAmount?: number;
    providers?: string;
    paymentMethod: 'discounted' | 'credit' | 'partial' | 'consignment';
    files?: [ RequestFiles];
    egress?: Egress;
    users: any;
    dataFiles: [any];
    type: 'orders',
}


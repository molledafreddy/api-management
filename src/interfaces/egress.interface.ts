import { paymentTypeHasEgress } from "./payment-type-has-egress.interface";
import { RequestFiles } from "./request-files.interface";

export interface Egress {
    _id?: string,
    invoiceNumber?: String;
    amount?: number;
    orders?: string;
    operationBills?: string;
    payroll?: string
    description?: String;
    files?: [RequestFiles],
    paymentHasEgress?: [paymentTypeHasEgress];
}
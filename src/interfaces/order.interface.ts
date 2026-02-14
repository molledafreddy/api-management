import { Auth } from "./auth.interface";

export interface Order extends Auth {
    id?: string;
    paymentDate?: Date;
    receptionDate?: Date;
    EstimateReceptionDate?: Date;
    creditPaymentDate?: Date;
    orderDate?: Date;
    descriptionOrder?: String;
    status: 'solicitado' | 'recibido' | 'no_recibido' | 'verificado' | 'cancelado' | 'cancelado_proveedor' | 'pagado' | 'pendiente_por_pago';
    estimatedAmount?: Number;
    amountPaid?: number;
    providers?: string;
    paymentMethod: 'discounted' | 'credit' | 'partial' | 'consignment';
    invoiceFile?: string;
    validAdmin: 'Verificado' | 'por_Verificado' | 'con_error';
    validDate: Date;
    noteValid: string;
}
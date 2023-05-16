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
    paymentMethod: 'descontado' | 'credito' | 'parcial' | 'consignacion';
    invoiceFile?: string;
    validAdmin?: 'Verificado' | 'por_verificar' | 'con_error';
    noteValid?: string;
    validDate?: Date;
    usersAdmin?: string;
    role?: string;
}
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
    status: 'solicitado' | 'recibido' | 'no_recibido' | 'verificado' | 'cancelado' | 'cancelado_proveedor' | 'pagado' | 'pendiente_por_pago';
    estimatedAmount?: number;
    providers?: string;
    paymentMethod: 'descontado' | 'credito' | 'parcial' | 'consignacion';
    files?: [ RequestFiles];
    egress?: Egress;
    users: any;
    dataFiles: [any];
    type: 'orders',
    validAdmin?: 'Verificado' | 'por_verificar' | 'con_error';
    noteValid?: string;
    validDate?: Date;
    usersAdmin?: string;
    role?: string;
}


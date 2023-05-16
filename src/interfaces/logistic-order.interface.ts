
export interface LogisticOrder {
    status: 'solicitado' | 'recibido' | 'no_recibido' | 'verificado' | 'cancelado' | 'cancelado_proveedor' | 'pagado' | 'pendiente_por_pago';
    orders?: string;
    users?: string;
    workingDay: string;
    descriptionLogistic?: String;
}
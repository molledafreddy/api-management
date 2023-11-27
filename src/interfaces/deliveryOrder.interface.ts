
export interface DeliveryOrder {
    nameClient?: string;
    address?: string;
    phone?: string;
    status?: 'activo' | 'procesando' | 'entregado' | 'cancelado';
}
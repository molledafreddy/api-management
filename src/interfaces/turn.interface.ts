
export interface Turn {
    _id?: string,
    startDate: Date;
    endDate?: Date;
    paymentDate?: Date;
    description?: string;
    users?: string;
    workingDay?: string;
    type: 'normal' | 'full' | 'partial';
    status?: 'Active' | 'Stop' | 'completed';
    statusPayment?: 'Paid' | 'In_verification' | 'verified' | 'Canceled' | 'Not_Payed';
}
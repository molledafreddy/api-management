
export interface RequestTurn {
    _id?: null,
    startDate: string;
    endDate?: string;
    paymentDate?: Date;
    description?: string;
    created: Date;
    users: string;
    workingDay: string;
    type: 'normal' | 'full' | 'partial';
    status?: 'Active' | 'Stop' | 'completed';
    statusPayment?: 'Paid' | 'In_verification' | 'verified' | 'Canceled' | 'Not_Payed';
}
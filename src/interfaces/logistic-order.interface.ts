
export interface LogisticOrder {
    status: 'requested' | 'received' | 'no_received' | 'verified' | 'cancelled' | 'cancelled_provider' | 'paid_out' | 'pending_for_payment';
    orders?: string;
    users?: string;
    workingDay: string;
    descriptionLogistic?: String;
}
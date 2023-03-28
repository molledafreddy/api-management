
export interface Revenue {
    amountTransfer?: number;
    amountPos?: number;
    amountCash?: number;
    amountOther?: number;
    amountSistem?: number;
    description?: String;
    turn?: String;
    cashFund?: number;
    amountTurn: number;
    totalAmount: number;
    users?: string;
    workingDay?: string;
    files?: any;
    type: 'other' | 'closure';
}

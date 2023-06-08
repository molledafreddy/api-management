
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
    usersAdmin?: string;
    workingDay?: string;
    files?: any;
    type: 'other' | 'closure';
    validAdmin?: 'Verificado' | 'por_verificar' | 'con_error';
    noteValid?: string;
    validDate?: Date;
    createdDate?: Date;
}

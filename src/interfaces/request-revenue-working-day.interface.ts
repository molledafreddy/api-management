import { Revenue } from "./revenue.interface";
import { DetailRevenue } from "./detail-revenue.interface";
import { RequestFiles } from "./request-files.interface";

export interface RequestRevenueWorkingDay  {
    id?: string;
    revenue: Revenue;
    users: string;
    usersAdmin?: string;
    files?:[ RequestFiles];
    dataFiles?: [any];
    type?: string;
    validAdmin?: 'Verificado' | 'por_verificar' | 'con_error';
    noteValid?: string;
    validDate?: Date;
}


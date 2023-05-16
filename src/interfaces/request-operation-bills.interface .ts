import { Egress } from "./egress.interface";
import { RequestFiles } from "./request-files.interface";

export interface RequestOperationBills  {
    id?: string;
    amount?: number;
    description?: String;
    type: 'salario' | 'administrativo' | 'contador' | 'inversion' | 'servicio_electrico' 
    | 'servicio_agua' 
    | 'gastos_comunes' 
    | 'decrease' 
    | 'alquiler' 
    | 'productos_limpieza' 
    | 'beneficios' 
    | 'materiales_contruccion' 
    | 'personal' 
    | 'implementos' 
    | 'remodelacion' 
    | 'publicidad' 
    | 'innovación'
    | 'ganancia'
    | 'otros';
    egress?: Egress;
    users?: string;
    files?:[ RequestFiles];
    dataFiles?: [any];
}


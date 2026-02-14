import { Egress } from "./egress.interface";
import { RequestFiles } from "./request-files.interface";

export interface RequestOperationBills  {
    id?: string;
    amount?: number;
    description?: String;
    type: 'salario' | 'administrativo' | 'contador' | 'inversion' |'servicio_electrico' | 'servicio_agua' | 'gastos_comunes' | 'disminucion' | 'alquiler' | 'productos_limpieza' | 'ganancias' | 'materiales_construccion' | 'personal' | 'implementos' | 'remodelacion' | 'publicidad' | 'innovacion' | 'otros';
    egress?: Egress;
    users?: string;
    files?:[ RequestFiles];
    dataFiles?: [any];
}
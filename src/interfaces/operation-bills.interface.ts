
export interface OperationBills {
    amount: number;
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
    description?: String;
}
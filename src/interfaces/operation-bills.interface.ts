
export interface OperationBills {
    amount: number;
    type: 'salario' | 'administrativo' | 'contador' | 'inversion' |'servicio_electrico' | 'servicio_agua' | 'gastos_comunes' | 'disminucion' | 'alquiler' | 'productos_limpieza' | 'ganancias' | 'materiales_construccion' | 'personal' | 'implementos' | 'remodelacion' | 'publicidad' | 'innovacion' | 'beneficios' | 'otros';
    description?: String;
}
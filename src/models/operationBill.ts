import  mongoose, { Schema, Types, model, Model } from "mongoose";
import { OperationBills } from "../interfaces/operation-bills.interface";
import paginate from 'mongoose-paginate-v2';

const OperationBillSchema: Schema = new Schema <OperationBills> (
    {
        amount: {
            type: Number,
            required: false
        },
        type: {
            type: String,
            enum: ['salario', 
                   'administrativo', 
                   'contador', 
                   'inversion', 
                   'servicio_electrico', 
                   'servicio_agua', 
                   'gastos_comunes', 
                   'decrease', 
                   'alquiler', 
                   'productos_limpieza', 
                   'beneficios', 
                   'materiales_contruccion', 
                   'personal', 
                   'implementos', 
                   'remodelacion', 
                   'publicidad', 
                   'innovación',
                   'ganancia',
                   'otros' 
            ],
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

OperationBillSchema.plugin(paginate);

interface operationBillDocument extends mongoose.Document, OperationBills {}

OperationBillSchema.index({ 
    type: 'text', 
    description: 'text'
});

const OperationBillModel = mongoose.model<
operationBillDocument,
  mongoose.PaginateModel<operationBillDocument>
>('operationBills', OperationBillSchema, 'operationBills');

OperationBillModel.createIndexes();
export default OperationBillModel;

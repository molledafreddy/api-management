
export interface Account {
    number: string;
    type: 'corriente' | 'vista' | 'ahorro' | 'rut';
    email?: string;
    banks: string;
    providers: string;
    created: Date;
}

export interface DetailRevenue {
    type: "efectivo" | "punto" | "transferencia" | "otros";
    description?: String;
    amount: number;
    revenues: String;
}

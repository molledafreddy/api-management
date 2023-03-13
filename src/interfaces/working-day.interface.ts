
export interface WorkingDay {
    type: 'normal' | 'holiday' | 'inalienable';
    created?: Date;
}
export class coupon {
    static fields: Array<any> = [
        { field: 'code' },
        { field: 'amount', dataType: 'currency' },
        { field: 'minimumCartValue', dataType: 'number' },
        { field: 'info' },
        { field: 'type' },
        { field: 'active', dataType: 'boolean' }
    ];
}
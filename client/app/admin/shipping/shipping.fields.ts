export class fields {
    static shipping: Array<any> = [
        { field: 'carrier' },
        { field: 'charge', dataType: 'currency' },
        { field: 'minWeight', dataType: 'number' },
        { field: 'maxWeight', dataType: 'number' },
        { field: 'freeShipping', dataType: 'currency' },
        { field: 'active', dataType: 'boolean' }
    ];
}
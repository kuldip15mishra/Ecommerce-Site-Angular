export class review {

    static fields: Array<any> = [
        { field: 'pid', heading: 'Product ID', dataType: 'product-detail', id: 'pid', slug: 'pslug' },
        { field: 'pname', heading: 'Product Name' },
        { field: 'reviewer' },
        { field: 'email' },
        { field: 'message' },
        { field: 'rating', dataType: 'number' },
        { field: 'created', dataType: 'date' }
    ];
}
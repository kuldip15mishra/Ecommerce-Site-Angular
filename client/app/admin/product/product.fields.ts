export class product {
    static fields: Array<any> = [
        { field: 'image', dataType: 'product-image' },
        { field: 'name', dataType: 'product-detail', id: '_id', slug: 'slug' },
        { field: 'active', dataType: 'boolean' },
    ];
}
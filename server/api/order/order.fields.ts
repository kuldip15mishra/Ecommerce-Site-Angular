

// Could not use import as this file is being shared with client
module.exports = [
    { field: 'name', heading: 'Product Name', list: true },
    { field: 'destination', heading: 'Destination', required: true },
    { field: 'season', dataType: 'select', heading: 'Season', list: true },
    { field: 'fromDate', dataType: 'date', heading: 'From Date', list: true },
    { field: 'toDate', dataType: 'date', heading: 'To Date', list: true },
    { field: 'description', heading: 'Description' },
    { field: 'discount', heading: 'Discount' },
    { field: 'commission', heading: 'Commission' },
    { field: 'commission1', heading: 'Commission Company' },
    { field: 'image', heading: 'Image' },
    { field: 'status', heading: 'Status', dataType: 'boolean' }
];

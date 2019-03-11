module.exports = [
    { field: 'name', heading: 'User Name', list: true },
    { field: 'email', heading: 'Email', required: true, list: true },
    { field: 'role', heading: 'Role', dataType: 'select', list: true },
    { field: 'status', heading: 'Status', dataType:'boolean', list: true }
];

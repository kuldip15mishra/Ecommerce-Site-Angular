import { Settings } from './../../settings';

export class vendor {
    static fields: Array<any> = [
        { field: 'name' },
        { field: 'role', dataType: 'select', options: Settings.userRoles },
        { field: 'avatar', dataType: 'image' },
        { field: 'active', dataType: 'boolean' }
    ];
}
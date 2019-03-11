import { LabelcasePipe } from './../pipes/labelcase.pipe';
import { Injectable } from '@angular/core';
import { CRUD } from './crud.interface';
@Injectable()
export class CrudHelper {
    // private labelcasePipe: LabelcasePipe;
    // constructor(private labelcasePipe: LabelcasePipe) { }
    help(fields: any) {
        let obj: any[] = [];
        fields.filter((i: any) => {
            let o: any = {};
            // if(!i.heading){
            //     i.heading = i.field;
            // }
            // i.heading = this.labelCasePipe.transform(i.heading);
            // Extract sortType from type
            if (i.dataType === 'numeric' || i.dataType === 'number' || i.dataType === 'float' || i.dataType === 'integer' || i.dataType === 'currency') {
                i.dataType = 'parseFloat';
                o.sortType = 'parseFloat';
            } else if (i.dataType === 'date' || i.dataType === 'calendar') {
                i.dataType = 'date';
                o.sortType = 'date';
            } else if (i.dataType === 'link' || i.dataType === 'ref' || i.dataType === 'href' || i.dataType === 'hyperlink') {
                i.dataType = 'link';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'product-detail') {
                i.dataType = 'product-detail';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'product-image') {
                i.dataType = 'product-image';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'array' || i.dataType === 'multi' || i.dataType === 'multiple') {
                i.dataType = 'array';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'dropdown' || i.dataType === 'select' || i.dataType === 'option') {
                i.dataType = 'select';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'textarea' || i.dataType === 'multiline') {
                i.dataType = 'textarea';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'image' || i.dataType === 'photo' || i.dataType === 'picture') {
                i.dataType = 'image';
                o.sortType = 'lowercase';
            } else if (i.dataType === 'boolean') {
                i.dataType = 'boolean';
                o.sortType = 'lowercase';
            } else {
                i.dataType = 'text';
                o.sortType = 'lowercase';
            }
            // check heading (Assign heading if not exists)
            if ('heading' in i) {
                o.heading = i.heading;
            } else if ('title' in i) {
                o.heading = i.title;
            } else {
                o.heading = i.field;
            }

            // Assign fields to object
            o.heading = new LabelcasePipe().transform(o.heading);
            o.field = i.field;
            o.noSort = i.noSort;
            o.noAdd = i.noAdd;
            o.noEdit = i.noEdit;
            o.dataType = i.dataType;
            o.options = i.options;
            o.link = i.link;
            o.id = i.id;
            o.slug = i.slug;
            obj.push(o);
            // return element.postId == id;
        });
        return obj;
    }
}

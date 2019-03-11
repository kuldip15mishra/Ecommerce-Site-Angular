import { MatSnackBar } from '@angular/material';
import { CrudBaseService } from './base.service';
import { Settings } from './../../settings';
import { AuthHttp, AuthHttpError } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService extends CrudBaseService {
    private apiPath: string = '/api/';
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private authHttp: AuthHttp, private http: Http, private snack: MatSnackBar) {
        super();
    }

    get(api: string, params?: any, auth?: boolean): Observable<any> {
        let http = auth ? this.authHttp : this.http;
        return http.get(this.apiPath + api + '/', { search: params })
            .map(this.extractData)
            .share()
            .catch(this.handleError);
    }

    getOne(api: string, id: string, auth?: boolean, cache?: boolean): Observable<any> {
        if (!this.record.api) {
            this.record.api = {};
        }
        if (!this.record.api.id) {
            this.record.api.id = {};
        }
        if (this.record.api.id && this.record.api.id._id === id && !cache) {
            return Observable.of(this.record.api.id);
        } else {
            let http = auth ? this.authHttp : this.http;
            return http.get(this.apiPath + api + '/' + id)
                .map(this.extractData)
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
        }
    }

    add(api: string, body: any, notdemo?: boolean): Observable<any> | any {
        if (Settings.demo && !notdemo) return Observable.throw('Demo mode: Unable to save');

        return this.authHttp.post(this.apiPath + api, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(api: string, body: any, auth: boolean = true, notdemo?: boolean): Observable<any> {
        // Auth true/false required for change password
        if (Settings.demo && !notdemo) return Observable.throw('Demo mode: Unable to save');

        if (!auth) {
            return this.http.post(this.apiPath + api, body)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.authHttp.post(this.apiPath + api, body)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    put(api: string, body: any, notdemo?: boolean): Observable<any> {
        if (Settings.demo && !notdemo) return Observable.throw('Demo mode: Unable to save');

        return this.authHttp.put(`${this.apiPath}${api}`, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    patch(api: string, id: string, body: any, notdemo?: boolean): Observable<any> {
        if (Settings.demo && !notdemo) return Observable.throw('Demo mode: Unable to save');

        return this.authHttp.patch(`${this.apiPath}${api}/${id}`, body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(api: string, id: string, notdemo?: boolean): Observable<any> {
        if (Settings.demo && !notdemo) return Observable.throw('Demo mode: Unable to save');

        return this.authHttp.delete(`${this.apiPath}${api}/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

}

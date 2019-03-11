import { Settings } from './../../settings';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    private url: string = '/api/products';
    private products: any;
    private product: any = {};
    private observable: Observable<any>;

    constructor(private http: AuthHttp) {
    }
    get(params?: any, cache?: boolean) {
        if (this.products && !cache && !params) {
            return Observable.of(this.products);
        } else if (this.observable && !cache && !params) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.url, { search: params })
                .map(res => {
                    this.observable = null;
                    if (res.status == 400) {
                        return "FAILURE";
                    } else if (res.status == 200) {
                        this.products = res.json();
                        return this.products;
                    }
                })
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
            return this.observable;
        }
    }

    getOne(id: string, cache?: boolean) {
        if (this.product[id] && !cache) {
            return Observable.of(this.product[id]);
        } else if (this.observable && !cache) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.url + '/' + id)
                .map(res => {
                    this.observable = null;
                    if (res.status == 400) {
                        return "FAILURE";
                    } else if (res.status == 200) {
                        this.product[id] = res.json();
                        return this.product[id];
                    }
                })
                .share()
                .catch(this.handleError)
                .do((res: Response) => { return this.extractData; });
            return this.observable;
        }
    }

    post(body: any) {
        if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.post(this.url, body)
            .map(res => {
                this.products = null;// Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }

    patch(id: string, body: any) {
        if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.patch(`${this.url}/${id}`, body)
            .map(res => {
                this.products = null; this.product[id] = null;// Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }
    delete(id: string) {
        if (Settings.demo) return Observable.throw('Demo mode: Unable to save');

        return this.http.delete(`${this.url}/${id}`)
            .map(res => {
                this.products = null; this.product[id] = null; // Invalidate cache
                this.extractData(res);
            })
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status < 200 || error.status >= 300) {
                errMsg = 'This request has failed ' + error.status + ' - ' + error.statusText;
            } else {
                errMsg = `${error.status} - ${error.statusText || ''}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg || 'Server Error');
    }
}

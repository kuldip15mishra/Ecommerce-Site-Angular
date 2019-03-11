'use strict';
import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

type UserType = {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UserService {
    private url: string = '/api/users/';
    private users: any;
    private observable: Observable<any>;

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private authHttp: AuthHttp, private http: Http) { }

    getUsers(params?: any) {
        if (this.users && !params) {
            return Observable.of(this.users);
        } else if (this.observable && !params) {
            return this.observable;
        } else {
            this.observable = this.authHttp.get(this.url, { search: params })
                .map(res => {
                    this.observable = null;
                    if (res.status == 400) {
                        return "FAILURE";
                    } else if (res.status == 200) {
                        return res.json() || [];
                    }
                })
                .share()
                .catch(this.handleError)
            return this.observable;
        }
    }

    query(): Observable<any> {
        return this.authHttp.get(this.url);
    }
    get(user: any = { id: 'me' }): Observable<any> {
        let myHeader = new Headers();
        myHeader.append('Authorization', 'application/json');

        return this.authHttp.get(`${this.url}${user.id || user._id}`, { headers: myHeader });
    }

    editUser(user): Observable<any> {
        return this.authHttp.put(`${this.url}${user._id}`, JSON.stringify(user), this.options);
    }

    deleteUser(user): Observable<any> {
        return this.authHttp.delete(`${this.url}${user._id}`, this.options);
    }

    login(credentials): Observable<any> {
        return this.http.post('/auth/local', JSON.stringify(credentials), this.options);
    }

    register(user: UserType): Observable<any> {
        return this.http.post(this.url, JSON.stringify(user), this.options);
    }

    create(user: UserType): Observable<any> {
        return this.http.post(this.url, JSON.stringify(user), this.options);
    }
    remove(user: any): Observable<any> {
        return this.authHttp.delete(`${this.url}${user.id || user._id}`);
    }
    changePassword(id: string, oldPassword: string, newPassword: string): Observable<any> {
        return this.authHttp.put(`${this.url}${id}/password`, { oldPassword, newPassword });
    }

    getProfile(uid) {
        return this.authHttp.get(this.url + uid).map(res => { return res.json() || []; });
    }

    saveProfile(uid, data: any) {
        return this.authHttp.put(this.url + uid, data);
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

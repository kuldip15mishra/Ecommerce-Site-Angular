import { Settings } from './../../settings';
import { AuthHttp, AuthHttpError } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class CrudBaseService {
  protected data: any = { api: null };
  protected record: any = { api: null };
  private observable: Observable<any>;

  protected callCache(res: Response, post?: boolean) {
    this.record.api = res.json();
    (post) ? this.data.api.push(res.json()) : this.data.api = null;// Invalidate cache if not inserting
    return this.record.api;
  }
  protected extractData(res: Response) {
    this.observable = null;
    if (res.status >= 400) {
      return "FAILURE";
    } else if (res.status >= 200 && res.status <= 300) {
      return res.json() || [];
    }
  }
  protected handleError(error: Response | any) {
    let status = error.status;
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof AuthHttpError) {
      errMsg = error.message;
    } else if (error instanceof Response) {
      if (error.status === 403)
        errMsg = 'Unauthorized... ';
      else if (error.status === 404)
        errMsg = 'Requested url ' + error.url + ' not found';
      else {
        const body = error.json() || '';
        if (status === 500) {
          errMsg = body.message;
        } else {
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
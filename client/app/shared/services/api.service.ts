import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  apiPath: string = '/api/';
  constructor(private http: Http) {

  }
  get() {
    return this.http.get(this.apiPath + 'products')
      .map((res: Response) => res.json());
    // .catch(this.handleError);
  }
  getProduct(id: string) {
    return this.http.get(this.apiPath + 'products/' + id)
      .map((res: Response) => res.json());
    // .catch(this.handleError);
  }
  // private handleError(error: Response) {
  //     let msg = `Status code ${error.status} on url ${error.url}`;
  //     console.log(msg);
  // }
}

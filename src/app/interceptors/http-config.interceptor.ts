import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')

    if (request.url.includes(environment.api_url)) {


      const params = request.params;
      let headers = request.headers;


      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }

      request = request.clone({
        params,
        headers
      });
    }

    return next.handle(request);
  }
}

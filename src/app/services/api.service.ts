import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = environment.api_url;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);


  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getValue(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  setValue(newValue): void {
    this.isAuthenticated.next(newValue);
  }

  getRequest(url: string):Promise<any> {
    return this.http.get(this.base_path+url).toPromise()
  }

  postRequest(url: string, data:any):Promise<any> {
    return this.http.post(this.base_path+url,data,this.httpOptions).toPromise()
  }

  updateRequest(url: string, data:any):Promise<any> {
    return this.http.put(this.base_path+url,data,this.httpOptions).toPromise()
  }

  deleteRequest(url: string):Promise<any> {
    return this.http.delete(this.base_path+url).toPromise()
  }

  registerRequest(url: string, data:any):Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', '*/*');
    return this.http.post(this.base_path+url,data,{params, headers}).toPromise()
  }

}

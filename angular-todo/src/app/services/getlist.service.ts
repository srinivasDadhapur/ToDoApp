import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetlistService {

  constructor(private http:HttpClient) { }

  getListofItems(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/todo/getlist',{},{headers:headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
}

}

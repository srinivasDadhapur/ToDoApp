import { Injectable,Component } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetlistService {
  // public removeItem;
  constructor(private http:HttpClient) { }

  getListofItems(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/todo/getlist',{},{headers:headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
}
  removeTodoItem(removeItem){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/todo/delete',{"todo":removeItem},{headers:headers}).pipe(catchError(this.errorHandler));
  }
  addTodoItem(todoitem,duedate){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/todo/add',{"todo":todoitem,"dueDate":new Date(duedate)},{headers:headers}).pipe(catchError(this.errorHandler));
  }

}



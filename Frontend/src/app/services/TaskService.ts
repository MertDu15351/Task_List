import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../Models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:8080/tasks');
  }

  addTask(newTask: Partial<Task>): Observable<any>{
    return this.http.post('http://localhost:8080/tasks', newTask);
  }

  deleteTask(id: number):Observable<any>{
    return this.http.delete(`http://localhost:8080/tasks/${id}`);
  }

  deleteAllTasks():Observable<any>{
    return this.http.delete(`http://localhost:8080/tasks/all`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../Model/ITask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  // declare variables to store dataurl
  private dataurl = 'http://localhost:3000/tasks';

  /**
   * @param http 
   */
  constructor(private http:HttpClient) { }

  /**
   * @returns the list of tasks found dataurl
   */
  getTasks():Observable<ITask[]>{
    // get Request
    return this.http.get<ITask[]>(this.dataurl)
  } 
}



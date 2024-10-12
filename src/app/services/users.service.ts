import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Model/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // declare variables to store dataurl
  private dataurl = 'http://localhost:3000/users'

  /**
   * @param http 
   */
  constructor(private http:HttpClient) { }

  /** 
   * @returns the list of users.
   */
  getUsers(): Observable<IUser[]>{
    // get Request
    return this.http.get<IUser[]>(this.dataurl)
  }
}

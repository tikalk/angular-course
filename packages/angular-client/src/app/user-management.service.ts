import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private users: {password: string; username: string}[] = [];

  allUsers$ = new BehaviorSubject<any[]>(this.users);

  currentUser$ = new BehaviorSubject(null);
  constructor() { }

  getUsers(): Observable<any[]> {
    return this.allUsers$;
  }


  createUser(user: {password: string; username: string}) {
    // validate that no user exist by that name
    if (!this.users.find(userInList => userInList.username === user.username)){
      // Add the user to the list

      this.users.push(user);
      this.allUsers$.next(this.users);
      this.currentUser$.next(user);
    }

  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  logout() {
    this.currentUser$.next(null)
  }
}

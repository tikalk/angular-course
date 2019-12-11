import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from './data-model/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  constructor(private httpClient: HttpClient) {
  }


  users: User[] = [];

  currentUserSubject$ = new BehaviorSubject<User>(null)
  allUsersSubject$ = new BehaviorSubject<User[]>([]);
  getUsers(): Observable<User[]> {
    const usersFromServer$ =  this.httpClient.get<{[name: string] : User}>('/api/users/users')
      .pipe(map(usersObj => {
        return Object.keys(usersObj).map(key => usersObj[key])
      }));

    usersFromServer$.subscribe(users => {
      this.users = users;
      this.allUsersSubject$.next(users)
    });

    return this.allUsersSubject$;
  }

  createUser(userData: User): Observable<User> {


    const observable =  this.httpClient.post<User>('/api/users/register', userData);
    observable.subscribe(user => {
      this.currentUserSubject$.next(user);
      this.users.push(user);
     // this.allUsersSubject$.next(this.users);

    });

    return observable;
  }

  getUsrById(userId: string): Observable<User> {

     return this.httpClient.get<User>(`/api/users/user/${userId}`);
  }

  userExistValidator(): null | ValidationErrors {
    return (control: AbstractControl) => {
      return this.getUsrById(control.value).pipe(map(user => {
        return !user ? null: {userExists: 'Usr already exists'};
      }), catchError(err=> {
          console.log('error', err);
          return of(err.status === 404 ? null: 'Error getting users');
      }))
    }
  }

  getCurrentUser(): Observable<User> {
     this.httpClient.get<User>('/api/users/currentUser')
      .subscribe(user => this.currentUserSubject$.next(user));
    return this.currentUserSubject$;
  }

  logout() {
    this.httpClient.post('/api/users/logout', null).subscribe(() => {
      this.currentUserSubject$.next(null);
    })
  }
}
